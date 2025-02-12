# Our Todo List

## Stack

* Deployment platform: Cloudflare (Workers)
* Backend framework: Hono (JS)
* Database: Cloudflare D1
* Object storage: Cloudflare R2
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
mkdir public/js
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
echo "USERNAME=<your-username>" >> .dev.vars
echo "PASSWORD=<your-password>" >> .dev.vars
echo "R2_ACCESS_KEY_ID=<key-id>" >> .dev.vars
echo "R2_SECRET_ACCESS_KEY=<secret-key>" >> .dev.vars
echo "R2_ENDPOINT=<endpoint>" >> .dev.vars
echo "R2_BUCKET=<bucket-name>" >> .dev.vars
echo "ACCOUNT_ID=<account-id>" >> .dev.vars
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
npx wrangler secret put R2_ACCESS_KEY_ID
npx wrangler secret put R2_SECRET_ACCESS_KEY
npx wrangler secret put R2_ENDPOINT
npx wrangler secret put R2_BUCKET
npx wrangler secret put ACCOUNT_ID
```

```
npm run deploy
```

## References

* [Hono + htmx + Cloudflare is a new stack](https://blog.yusu.ke/hono-htmx-cloudflare/)
* [SSR Tailwind CSS with Hono JS on Cloudflare Workers](https://youtu.be/wIqURcwxB20)
