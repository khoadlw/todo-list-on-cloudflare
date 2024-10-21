import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { timing, setMetric, startTime, endTime } from 'hono/timing'
import type { TimingVariables } from 'hono/timing'
import { basicAuth } from 'hono/basic-auth'
import { serveStatic } from 'hono/cloudflare-workers'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// @ts-ignore -- this is a hack for Cloudflare Workers only
import manifest from '__STATIC_CONTENT_MANIFEST'

import { Layout, About, TaskList, Item } from './home'

type Variables = TimingVariables

type Bindings = {
  DB: D1Database
  USERNAME: string
  PASSWORD: string
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

export default app
