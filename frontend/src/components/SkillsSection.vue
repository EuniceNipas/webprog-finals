<script setup>
const skills = [
  { name: 'HTML', icon: '🌸', color: 'from-pink-200 to-rose-300', border: 'border-rose-300' },
  { name: 'JavaScript', icon: '✨', color: 'from-yellow-200 to-pink-200', border: 'border-pink-300' },
  { name: 'Python', icon: '🐍', color: 'from-fuchsia-200 to-pink-200', border: 'border-fuchsia-300' },
]
</script>

<template>
  <section>
    <h2 class="text-center text-2xl font-extrabold text-pink-500 dark:text-purple-400 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
      ✿ Skills ✿
    </h2>

    <div class="mt-8 flex flex-wrap justify-center gap-6">
      <div
        v-for="skill in skills"
        :key="skill.name"
        :class="skill.border"
        class="group flex flex-col items-center gap-3 rounded-3xl border-2 bg-white/80 dark:bg-gray-900/80 dark:border-purple-500/30 p-6 shadow-lg shadow-pink-100/50 dark:shadow-purple-900/30 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-300/50 dark:hover:shadow-purple-500/30 cursor-pointer min-w-[140px]"
      >
        <!-- Icon badge -->
        <div
          :class="'bg-gradient-to-br ' + skill.color"
          class="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-md transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
        >
          {{ skill.icon }}
        </div>

        <!-- Name -->
        <span class="text-sm font-extrabold text-pink-600 dark:text-purple-300 group-hover:text-pink-700 dark:group-hover:text-purple-200 transition-colors">
          {{ skill.name }}
        </span>

        <!-- Decorative dots -->
        <div class="flex gap-1">
          <div class="h-1.5 w-1.5 rounded-full bg-pink-300 dark:bg-purple-400 transition-all duration-300 group-hover:bg-pink-500 dark:group-hover:bg-purple-300" />
          <div class="h-1.5 w-1.5 rounded-full bg-pink-200 dark:bg-purple-500 transition-all duration-300 group-hover:bg-pink-400 dark:group-hover:bg-purple-400" style="transition-delay: 0.1s" />
          <div class="h-1.5 w-1.5 rounded-full bg-pink-100 dark:bg-purple-600 transition-all duration-300 group-hover:bg-pink-300 dark:group-hover:bg-purple-500" style="transition-delay: 0.2s" />
        </div>
      </div>
    </div>
  </section>
</template>
