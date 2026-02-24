<template>
  <section>
    <h2 class="text-center text-2xl font-extrabold text-pink-500 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
      ✿ About Me ✿
    </h2>

    <div class="mt-8 kawaii-card p-8 text-center">
      <!-- Profile icon -->
      <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-fuchsia-300 shadow-lg shadow-pink-200/50">
        <svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </div>

      <!-- Info cards -->
      <div class="grid gap-4 sm:grid-cols-2 mb-6">
        <div class="rounded-2xl border-2 border-pink-200 bg-pink-50/80 p-4 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-pink-200/50">
          <p class="text-xs font-bold uppercase tracking-wider text-pink-400">♡ Name</p>
          <p class="mt-1 text-lg font-bold text-pink-600">Eunice B. Nipas</p>
        </div>

        <div class="rounded-2xl border-2 border-pink-200 bg-pink-50/80 p-4 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-pink-200/50">
          <p class="text-xs font-bold uppercase tracking-wider text-pink-400">♡ Birthday</p>
          <p class="mt-1 text-lg font-bold text-pink-600">September 19th, 2006</p>
        </div>
      </div>

      <!-- Description -->
      <div class="rounded-2xl border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-fuchsia-50 p-6">
        <p class="leading-relaxed text-gray-600 font-medium">
          Hi, I'm Eunice, but some people call me <span class="font-bold text-pink-500">Nissy</span>! 🐱 
          If I were an animal, I'd totally be a cat — I love their eat-sleep-zoom lifestyle! 
          I'm a bit of a picky eater when it comes to veggies, but my biggest goal is to keep learning 
          more about the world. If you'd like to know me better, check out the other sections above! ♡
        </p>
      </div>
    </div>
  </section>
</template>
