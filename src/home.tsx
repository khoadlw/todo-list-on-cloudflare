import { html } from "hono/html"

export const Layout = (props: { children: any }) => html`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Todo app built with Hono on Cloudflare">
  <meta name="author" content="khoadlw">
  <title>Indie TODO List</title>
  <link rel="icon" type="image/png" href="/images/favicon.png">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="overflow-y-clip">

  <div class="flex flex-col h-screen max-w-screen-md mx-auto">
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
          class="w-6 h-6"
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
    <main class="flex flex-1 overflow-y-auto pb-4">
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
<div class="max-w-4xl flex-1 mx-auto my-auto">
  <p class="text-center text-base mb-4">
    This app is built with these latest technologies
  </p>
  <div class="columns-2 sm:columns-4 w-fit mx-auto">
    <div class="flex flex-col items-center">
      <div class="bg-gray-200 p-4 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 512 512"
          aria-label="Cloudflare"
        >
          <rect width="24" height="24" rx="15%" fill="#ffffff"/>
          <path fill="#f38020" d="M331 326c11-26-4-38-19-38l-148-2c-4 0-4-6 1-7l150-2c17-1 37-15 43-33 0 0 10-21 9-24a97 97 0 0 0-187-11c-38-25-78 9-69 46-48 3-65 46-60 72 0 1 1 2 3 2h274c1 0 3-1 3-3z"/>
          <path fill="#faae40" d="M381 224c-4 0-6-1-7 1l-5 21c-5 16 3 30 20 31l32 2c4 0 4 6-1 7l-33 1c-36 4-46 39-46 39 0 2 0 3 2 3h113l3-2a81 81 0 0 0-78-103"/>
        </svg>
      </div>
      <span class="my-2 hover:text-blue-600"><a href="https://developers.cloudflare.com/">Cloudflare</a></span>
    </div>
    <div class="flex flex-col items-center">
      <div class="bg-gray-200 p-4 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 256 330"
          aria-label="Hono"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path d="M134.128914,0.0285241348 C135.004876,-0.084095988 135.778135,0.136772398 136.448027,0.691127966 C161.092252,30.7691013 184.283386,61.9114813 206.02143,94.1182682 C222.115414,118.349028 235.808785,143.969267 247.102867,170.980313 C265.139606,219.088001 255.752498,260.942698 218.942204,296.543739 C186.734357,323.764829 149.628543,334.366491 107.624761,328.348723 C57.4172806,318.112156 23.292852,289.068242 5.25246878,241.216319 C0.553348662,225.63784 -0.992704858,209.735348 0.614241954,193.508843 C3.29010127,165.578104 9.91613958,138.631994 20.4923569,112.671176 C24.8992687,102.078791 30.6421224,92.3610429 37.7200565,83.5166069 C43.4946489,90.3944347 49.0161266,97.4624298 54.2851523,104.71993 C56.7248596,107.270292 59.2646201,109.70006 61.9050964,112.008572 C82.0595171,72.011154 106.134565,34.6845598 134.128914,0.0285241348 Z" fill="#FF5B11" opacity="0.993"></path>
            <path d="M129.490687,53.6994345 C153.80361,81.8998536 175.780191,111.937673 195.419768,143.813556 C201.577346,154.360883 206.656867,165.404501 210.659657,176.943747 C218.997863,209.747938 210.052711,236.804703 183.824201,258.112717 C158.457076,275.962601 130.627715,281.263432 100.336119,274.015209 C67.6704123,263.878695 48.7862031,241.902114 43.683491,208.086127 C42.4450844,197.424169 43.549645,187.043155 46.9965102,176.943747 C51.9117054,164.462279 57.8751399,152.53541 64.8868136,141.16314 C71.5128519,131.44473 78.1388903,121.726982 84.7649286,112.008572 C99.8166372,92.6539138 114.725223,73.2177556 129.490687,53.6994345 Z" fill="#FF9758"></path>
          </g>
        </svg>
      </div>
      <span class="my-2 hover:text-blue-600"><a href="https://hono.dev/">Hono</a></span>
    </div>
    <div class="flex flex-col items-center">
      <div class="bg-gray-200 p-4 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 144.00 102.00"
          aria-label="htmx"
          preserveAspectRatio="xMidYMid"
        >
          <path fill="#3465a4" d="   M 51.80 90.57   L 79.79 10.71   A 0.32 0.32 0.0 0 1 80.10 10.50   L 92.12 10.50   A 0.32 0.32 0.0 0 1 92.42 10.93   L 64.57 90.79   A 0.32 0.32 0.0 0 1 64.27 91.00   L 52.10 91.00   A 0.32 0.32 0.0 0 1 51.80 90.57   Z"/>
          <path fill="#333333" d="   M 23.95 51.36   L 49.33 61.15   A 0.30 0.30 0.0 0 1 49.51 61.52   L 46.40 71.02   A 0.30 0.30 0.0 0 1 46.00 71.20   L 10.40 56.34   A 0.30 0.30 0.0 0 1 10.22 56.06   L 10.22 46.11   A 0.30 0.30 0.0 0 1 10.40 45.83   L 46.01 30.96   A 0.30 0.30 0.0 0 1 46.41 31.14   L 49.52 40.65   A 0.30 0.30 0.0 0 1 49.34 41.02   L 23.95 50.80   A 0.30 0.30 0.0 0 0 23.95 51.36   Z"/>
          <path fill="#333333" d="   M 94.69 40.63   L 97.78 31.16   A 0.32 0.32 0.0 0 1 98.21 30.96   L 133.81 45.84   A 0.32 0.32 0.0 0 1 134.01 46.13   L 134.00 56.05   A 0.32 0.32 0.0 0 1 133.80 56.34   L 98.20 71.21   A 0.32 0.32 0.0 0 1 97.77 71.01   L 94.69 61.54   A 0.32 0.32 0.0 0 1 94.88 61.14   L 120.21 51.38   A 0.32 0.32 0.0 0 0 120.21 50.78   L 94.88 41.03   A 0.32 0.32 0.0 0 1 94.69 40.63   Z"/>
        </svg>
      </div>
      <span class="my-2 hover:text-blue-600"><a href="https://htmx.org/">htmx</a></span>
    </div>
    <div class="flex flex-col items-center">
      <div class="bg-gray-200 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 256 154"
            aria-label="Tailwind CSS"
            preserveAspectRatio="xMidYMid"
          >
          <linearGradient id="a" x1="-2.777778%" x2="100%" y1="32%" y2="67.555556%">
            <stop offset="0" stop-color="#2298bd"/>
            <stop offset="1" stop-color="#0ed7b5"/>
          </linearGradient>
          <path d="m128 0c-34.1333333 0-55.4666667 17.0666667-64 51.2 12.8-17.0666667 27.7333333-23.4666667 44.8-19.2 9.737481 2.4343704 16.697363 9.4985481 24.401067 17.3184 12.549689 12.7383704 27.07437 27.4816 58.798933 27.4816 34.133333 0 55.466667-17.0666667 64-51.2-12.8 17.0666667-27.733333 23.4666667-44.8 19.2-9.737481-2.4343704-16.697363-9.4985481-24.401067-17.3184-12.549689-12.7383704-27.07437-27.4816-58.798933-27.4816zm-64 76.8c-34.1333333 0-55.46666667 17.0666667-64 51.2 12.8-17.066667 27.7333333-23.466667 44.8-19.2 9.7374815 2.43437 16.697363 9.498548 24.4010667 17.3184 12.5496889 12.73837 27.0743703 27.4816 58.7989333 27.4816 34.133333 0 55.466667-17.066667 64-51.2-12.8 17.066667-27.733333 23.466667-44.8 19.2-9.737481-2.43437-16.697363-9.498548-24.401067-17.3184-12.549689-12.7383704-27.07437-27.4816-58.798933-27.4816z" fill="url(#a)"/>
        </svg>
      </div>
      <span class="my-2 hover:text-blue-600"><a href="https://tailwindcss.com/">Tailwind CSS</a></span>
    </div>
  </div>
  <p class="text-center text-base mt-8" id="04a98632use2">
    <a
      class="text-black font-medium underline underline-offset-4 hover:no-underline hover:text-blue-600"
      href="https://github.com/khoadlw/todo-list-on-cloudflare"
    >
      Check out the code on GitHub
    </a>
  </p>
</div>
`

export const TaskList = (props: { children: any }) => html`
<div
  class="container flex flex-col gap-4 px-4 md:gap-10 md:px-0"
  _="
    on htmx:beforeRequest
      wait for htmx:afterRequest or 150ms
      if the result is 150 remove .hidden from #loading end
    on htmx:afterRequest add .hidden to #loading
  "
>
  <div class="mx-auto flex flex-col gap-2 text-center" id="title-add">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl py-6">My Tasks</h1>
    <form
      hx-post="/todo" hx-target="#todo" hx-swap="afterend"
      _="on htmx:afterRequest reset() me then add .mx-auto to #title-add"
      class="flex items-center gap-4"
    >
      <div class="flex-1">
        <input
          name="title"
          type="text"
          class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
          id="new-task"
          placeholder="Add a new task..."
          _="on keyup if the length of my value is greater than 25 then remove .mx-auto from #title-add then add .mx-1 to #title-add"
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
  <div class="grid gap-2 overflow-y-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded px-2">
    <div id="todo"></div>
    ${props.children}
  </div>
  <div id="loading" class="hidden fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>
    <div class="p-4 bg-gray-200/90 rounded-full flex items-center space-x-4">
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
        class="animate-spin h-6 w-6"
      >
        <line x1="12" x2="12" y1="2" y2="6"/>
        <line x1="12" x2="12" y1="18" y2="22"/>
        <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/>
        <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/>
        <line x1="2" x2="6" y1="12" y2="12"/>
        <line x1="18" x2="22" y1="12" y2="12"/>
        <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/>
        <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/>
      </svg>
    </div>
  </div>
  <div
    id="img-view"
    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50"
    _="on click add .hidden"
  >
    <img id="full-img" class="max-w-3xl max-h-3xl object-contain" alt="Full Size Image" />
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
    <textarea
      hx-put={`/todo/${id}`} hx-target={`#task-${id}`} hx-swap="outerHTML" hx-trigger="keydown[key=='Enter']"
      _="
        -- Behavior: AutoResize + Editable
        def autoResize(ta) set ta.style.height to 'auto' then set ta.style.height to (ta.scrollHeight + 'px') end
        init immediately call autoResize(me) then set :original to my value
        on input or imagePasted or resize from window log 'autoresize' then call autoResize(me)
        on keydown[key is 'Enter'] halt the event
        on keydown[key is 'Escape'] add @disabled then remove .border-b .border-input then set my value to :original
        on blur if I do not match @disabled add .border-dashed end
        on paste
          set clipboardItems to event.clipboardData.items
          set imagePreview to my nextElementSibling
          repeat for item in clipboardItems
            if item.type.startsWith('image/')
              js(item, imagePreview, me)
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function(e) {
                  imagePreview.src = e.target.result;
                  imagePreview.classList.remove('hidden');
                  me.dispatchEvent(new CustomEvent('imagePasted'));
                };
                reader.readAsDataURL(file);
              end
              halt the event
              break
            end
          end
        end
      "
      id={`task-title-${id}`}
      class={`titleInput ${checked ? "line-through" : ""} flex-1 cursor-text bg-transparent outline-none w-1/2 resize-none overflow-y-hidden`}
      name="title"
      rows={1}
      disabled
    >
      {title}
    </textarea>
    {/* TODO: Use different image resolution for thumbnail */}
    <img
      class="w-8 h-auto overflow-y-clip hidden cursor-pointer"
      alt="Image Thumbnail"
      _="
      on click
        set modalImage to the first <img/> in #img-view
        set modalImage.src to my.src
        remove .hidden from #img-view
      "
    />
    <div class="flex gap-2">
      <button
        _="
          on click
            set input to (my parentElement's previousElementSibling).previousElementSibling
            remove @disabled from input then call input.focus()
            set input's selectionStart to input.value.length then set input's selectionEnd to input.value.length
            add .border-b .border-input to input
        "
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-8 h-8"
      >
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
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
          <path d="m15 5 4 4"/>
        </svg>
        <span class="sr-only">Edit</span>
      </button>
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
  </div>
)
