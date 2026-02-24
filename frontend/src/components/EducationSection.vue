<script setup>
const schools = [
  { level: 'Kinder', name: 'St. Gabriel Academy of Parañaque', emoji: '🌸', color: 'from-pink-300 to-pink-400' },
  { level: 'Grade School', name: 'Baclaran Elementary School Central', emoji: '📚', color: 'from-rose-300 to-rose-400' },
  { level: 'Junior High', name: 'Brainshire Science School', emoji: '🔬', color: 'from-fuchsia-300 to-fuchsia-400' },
  { level: 'Senior High', name: 'National University – MOA', emoji: '🎓', color: 'from-pink-400 to-fuchsia-400' },
  { level: 'College (ongoing)', name: 'Asia Pacific College', emoji: '💻', color: 'from-rose-400 to-pink-500' },
]
</script>

<template>
  <section>
    <h2 class="text-center text-2xl font-extrabold text-pink-500 dark:text-purple-400 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
      ✿ Education ✿
    </h2>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(school, i) in schools"
        :key="school.name"
        class="group relative overflow-hidden rounded-3xl border-2 border-pink-200 dark:border-purple-500/30 bg-white/80 dark:bg-gray-900/80 p-6 text-center shadow-lg shadow-pink-100/50 dark:shadow-purple-900/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-300/50 dark:hover:shadow-purple-500/30 hover:border-pink-400 dark:hover:border-purple-400 cursor-pointer"
      >
        <!-- Decorative gradient circle on hover -->
        <div :class="'bg-gradient-to-br ' + school.color" class="absolute -top-12 -right-12 h-28 w-28 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-30 group-hover:scale-150" />

        <!-- Emoji -->
        <div class="relative z-10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 dark:bg-purple-500/20 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-pink-200 dark:group-hover:bg-purple-500/30">
          {{ school.emoji }}
        </div>

        <!-- Level -->
        <p class="relative z-10 text-xs font-bold uppercase tracking-wider text-pink-400 dark:text-purple-400">{{ school.level }}</p>

        <!-- School name -->
        <p class="relative z-10 mt-2 text-sm font-bold text-gray-700 dark:text-gray-300 leading-snug group-hover:text-pink-600 dark:group-hover:text-purple-300 transition-colors duration-300">
          {{ school.name }}
        </p>

        <!-- Bottom decorative line -->
        <div class="mx-auto mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-pink-300 to-fuchsia-300 dark:from-purple-400 dark:to-fuchsia-400 transition-all duration-500 group-hover:w-16" />
      </div>
    </div>
  </section>
</template>
