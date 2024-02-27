import { html } from "hono/html"

export const Layout = (props: { children: any }) => html`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Todo app built with Hono on Cloudflare">
  <meta name="author" content="khoadlw">
  <title>Our Todo List</title>
  <link rel="icon" type="image/png" href="/images/favicon.png">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

  <div class="flex flex-col min-h-screen max-w-screen-md mx-auto">
    <header class="flex items-center h-[60px] px-4 border-b lg:px-6">
      <a class="flex items-center gap-2 font-semibold" href="#" rel="ugc">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 fill-current"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <path d="M12 22V12"></path>
        </svg>
        <span class="sr-only">Home</span>
      </a>
      <nav class="ml-auto flex items-center gap-4 shrink-0 lg:gap-6">
        <a
          class="flex items-center gap-2 font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/"
          rel="ugc"
        >
          Home
        </a>
        <a
          class="flex items-center gap-2 font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/"
          rel="ugc"
        >
          Tasks
        </a>
        <a
          class="flex items-center gap-2 font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/about"
          rel="ugc"
        >
          About
        </a>
      </nav>
    </header>
    <main class="flex-1 overflow-y-auto pb-4">
      ${props.children}
    </main>
    <footer class="flex items-center h-[60px] px-4 border-t shrink-0 lg:px-6">
      <div class="mx-auto flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>Made by <span class="italic">khoadlw</span></span>
      </div>
    </footer>
  </div>

  <script defer src="/js/htmx.min.js"></script>
  <script defer src="/js/_hyperscript.min.js"></script>
</body>
</html>
`

export const About = () => html`
<h1>This is the About page.</h1>
`

export const TaskList = (props: { children: any }) => html`
<div class="container flex flex-col min-h-[calc(100vh-_theme(spacing.10))-120px] gap-4 px-4 md:gap-10 md:px-6">
  <div class="mx-auto flex flex-col gap-2 text-center">
    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl py-6">Our Tasks</h1>
    <form
      hx-post="/todo" hx-target="#todo" hx-swap="afterend"
      _="on htmx:afterRequest reset() me"
      class="flex items-center gap-4"
    >
      <div class="flex-1">
        <input
          name="title"
          type="text"
          class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
          id="new-task"
          placeholder="Add a new task..."
        />
      </div>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
  <div class="grid gap-2">
    <div id="todo"></div>
    ${props.children}
  </div>
</div>
`

export const Item = ({ title, id, checked }: { title: string; id: string, checked: boolean }) => (
  <div id={`task-${id}`} class="flex items-center gap-4">
    <button
      hx-put={`/todo/${id}`} hx-target={`#task-${id}`} hx-swap="outerHTML" hx-vals={`{"checked": ${+!checked}}`}
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      value="on"
      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
    >
      <span data-state="checked" class={`${checked ? "" : "hidden"} flex items-center justify-center text-current pointer-events-none`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </button>
    <label for="task-1" class="flex-1 cursor-pointer select-none w-1/2">
      {title}
    </label>
    <button hx-delete={`/todo/${id}`} hx-target={`#task-${id}`} hx-swap="outerHTML" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-8 h-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
      <span class="sr-only">Delete</span>
    </button>
  </div>
)
