# Our Todo List

## Stack

* Deployment platform: Cloudflare (Workers)
* Backend framework: Hono (JS)
* Database: Cloudflare D1
* Frontend libraries: htmx + _hyperscript
* CSS framework: Tailwind CSS
* UI design tool: v0.dev

## Setup

### Prerequisites

* Node.js v20.10.0
* Cloudflare account

### Steps

```
npm install
```

```
npx wrangler login  # install + log in
```

```
npx tailwindcss -i ./src/globals.css -o ./public/css/styles.css
```

```
curl https://unpkg.com/htmx.org@1.9.10/dist/htmx.min.js -o public/js/htmx.min.js
curl https://unpkg.com/hyperscript.org@0.9.12/dist/_hyperscript.min.js -o public/js/_hyperscript.min.js
```

```
npx wrangler d1 create todo
# Then change the `database_id` in `wrangler.toml` accordingly
npx wrangler d1 execute todo --local --file=todo.sql
npx wrangler d1 migrations apply todo --local
```

```
touch .dev.vars
echo "USERNAME=<your-user-name>" >> .dev.vars
echo "PASSWORD=<your-password>" >> .dev.vars
```

```
npm run dev
```

## Deployment

```
npx wrangler d1 execute todo --file=todo.sql
npx wrangler d1 migrations apply todo
```

```
npx wrangler secret put USERNAME
npx wrangler secret put PASSWORD
```

```
npm run deploy
```

## References

* [Hono + htmx + Cloudflare is a new stack](https://blog.yusu.ke/hono-htmx-cloudflare/)
* [SSR Tailwind CSS with Hono JS on Cloudflare Workers](https://youtu.be/wIqURcwxB20)
