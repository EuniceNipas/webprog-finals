<script setup>
const interests = [
  { label: 'Fun Runs', image: '/gallery/assets/Run.jpg', emoji: '🏃‍♀️' },
  { label: 'Drawing', image: '/gallery/assets/Draw.jpg', emoji: '🎨' },
  { label: 'Vibing to Music', image: '/gallery/assets/Music.jpg', emoji: '🎵', link: '#music' },
  { label: 'Gaming', image: '/gallery/assets/Gaming.jpg', emoji: '🎮' },
]

function handleClick(item) {
  if (item.link) {
    document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section>
    <h2 class="text-center text-2xl font-extrabold text-pink-500 dark:text-purple-400 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
      ✿ My Interests ✿
    </h2>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(item, i) in interests"
        :key="item.label"
        @click="handleClick(item)"
        class="group relative overflow-hidden rounded-3xl border-2 border-pink-200 dark:border-purple-500/30 shadow-lg shadow-pink-100/50 dark:shadow-purple-900/30 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-300/40 dark:hover:shadow-purple-500/30 hover:border-pink-400 dark:hover:border-purple-400"
        :style="{ animationDelay: i * 0.1 + 's' }"
      >
        <!-- Image -->
        <img
          :src="item.image"
          :alt="item.label"
          class="h-52 w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
        />

        <!-- Default label (bottom) -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-500/80 to-transparent p-4 transition-all duration-500 group-hover:opacity-0">
          <p class="text-center text-sm font-bold text-white">{{ item.emoji }} {{ item.label }}</p>
        </div>

        <!-- Hover overlay -->
        <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 bg-pink-500/60 dark:bg-purple-600/60 backdrop-blur-sm">
          <span class="text-4xl mb-2 animate-wiggle">{{ item.emoji }}</span>
          <p class="text-lg font-extrabold text-white drop-shadow-lg">{{ item.label }}</p>
          <div class="mt-2 h-1 w-12 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  </section>
</template>
