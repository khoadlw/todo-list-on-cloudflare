import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { serveStatic } from 'hono/cloudflare-workers'
import { logger } from 'hono/logger'
import type { TimingVariables } from 'hono/timing'
import { endTime, startTime, timing } from 'hono/timing'
import { z } from 'zod'
import { AwsClient } from 'aws4fetch'

// @ts-ignore -- this is a hack for Cloudflare Workers only
import manifest from '__STATIC_CONTENT_MANIFEST'

import { About, Item, Layout, TaskList } from './home'

type Variables = TimingVariables

type Bindings = {
  DB: D1Database
  ASSETS: R2Bucket
  USERNAME: string
  PASSWORD: string
  R2_ACCESS_KEY_ID: string
  R2_SECRET_ACCESS_KEY: string
  R2_ENDPOINT: string
  R2_BUCKET: string
  ACCOUNT_ID: string
}

type Todo = {
  title: string
  id: string
  checked: boolean
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>()

app.use('*', timing({
  enabled: (c) => c.req.path === '/' || ['POST', 'PUT', 'PATCH', 'DELETE'].includes(c.req.method)
}))

app.use(logger())

app.use('/images/*', async (c, next) => {
  c.header('Cache-Control', 'public, max-age=31536000')
  await next()
})

app.use('/js/*', async (c, next) => {
  c.header('Cache-Control', 'public, max-age=31536000')
  await next()
})

app.use('/css/*', async (c, next) => {
  c.header('Cache-Control', 'public, max-age=604800')
  await next()
})

app.use('/*', async (c, next) => {
  const auth = basicAuth({
    username: c.env.USERNAME,
    password: c.env.PASSWORD,
  })
  return auth(c, next)
})

app.use('/*', serveStatic({ root: './', manifest }))

app.get('/', async (c) => {
  startTime(c, 'db-list')
  const { results } = await c.env.DB.prepare(
    `SELECT id, title, checked FROM todo WHERE is_deleted = 0 ORDER BY checked ASC, created_at DESC;`
  ).all<Todo>()
  endTime(c, 'db-list')

  const todos = results as unknown as Todo[]
  return c.html(
    <Layout>
      <TaskList>
        {todos.map((todo) => <Item {...todo} />)}
      </TaskList>
    </Layout>
  )
})

app.get('/about', async (c) => {
  return c.html(<Layout><About /></Layout>)
})

app.post(
  '/todo',
  zValidator('form', z.object({ title: z.string().min(1) })),
  async (c) => {
    const { title } = c.req.valid('form')
    const id = crypto.randomUUID()
    const created_at = Date.now()
    startTime(c, 'db-create')
    await c.env.DB.prepare(
      `INSERT INTO todo(id, title, created_at) VALUES(?, ?, ?);`
    ).bind(id, title, created_at).run()
    endTime(c, 'db-create')
    return c.html(<Item title={title} id={id} checked={false} />)
  }
)

app.put(
  '/todo/:id',
  zValidator(
    'form',
    z.object({
      checked: z.coerce.number().optional(),
      title: z.string().min(1).optional()
    }).refine(
      data => data.checked != null || data.title != null
    )
  ),
  async (c) => {
    const id = c.req.param('id')
    const { checked, title } = c.req.valid('form')
    // NOTE: undefined == null
    const updates = [checked != null ? 'checked = ?' : '', title != null ? 'title = ?' : ''].filter(u => u)
    const updateValues = [checked, title].filter(v => v != null)
    startTime(c, 'db-update')
    await c.env.DB.prepare(`UPDATE todo SET ${updates.join(', ')} WHERE id = ?;`).bind(...updateValues, id).run()
    endTime(c, 'db-update')
    const todo = await c.env.DB.prepare(`SELECT id, title, checked FROM todo WHERE ID = ?;`).bind(id).first<Todo>()
    if (todo) {
      return c.html(<Item title={todo.title} id={todo.id} checked={Boolean(todo.checked)} />)
    } else {
      c.status(200)
      return c.body(null)
    }
  }
)

app.delete('/todo/:id', async (c) => {
  const id = c.req.param('id')
  startTime(c, 'db-delete')
  await c.env.DB.prepare(`UPDATE todo SET is_deleted = 1 WHERE id = ?;`).bind(id).run()
  endTime(c, 'db-delete')
  c.status(200)
  return c.body(null)
})

app.get('/presignedUrls', async (c) => {
  const objectKey = c.req.query('path') || ''
  if (!objectKey) return c.json({ error: 'No path provided' }, 400)

  const r2 = new AwsClient({
    accessKeyId: c.env.R2_ACCESS_KEY_ID,
    secretAccessKey: c.env.R2_SECRET_ACCESS_KEY,
  })
  const bucketName = c.env.R2_BUCKET
  const accountId = c.env.ACCOUNT_ID
  const url = new URL(`https://${bucketName}.${accountId}.r2.cloudflarestorage.com`)
  url.pathname = objectKey
  url.searchParams.set("X-Amz-Expires", "3600")
  const signed = await r2.sign(
    new Request(url, { method: "PUT" }), { aws: { signQuery: true } }
  )
  return c.text(signed.url)
})

export default app
