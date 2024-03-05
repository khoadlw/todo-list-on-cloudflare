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
npx wrangler d1 create todo
# Then change the `database_id` in `wrangler.toml` accordingly
npx wrangler d1 execute todo --local --file=todo.sql
npx wrangler d1 migrations apply todo --local
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
npm run deploy
```

## References

* [Hono + htmx + Cloudflare is a new stack](https://blog.yusu.ke/hono-htmx-cloudflare/)
* [SSR Tailwind CSS with Hono JS on Cloudflare Workers](https://youtu.be/wIqURcwxB20)
