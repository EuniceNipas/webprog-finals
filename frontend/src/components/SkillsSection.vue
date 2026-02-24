<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const skills = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/skills')
    skills.value = data
  } catch (e) {
    console.error('Failed to load skills', e)
  } finally {
    loading.value = false
  }
})

const categoryColors = {
  frontend: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  backend: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  database: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  devops: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
}

function colorFor(category) {
  return categoryColors[category?.toLowerCase()] || categoryColors.other
}
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Skills</h2>

    <!-- Loading skeleton -->
    <div v-if="loading" class="mt-6 flex flex-wrap gap-3">
      <div
        v-for="i in 8"
        :key="i"
        class="h-9 w-24 animate-pulse rounded-full bg-gray-700/40"
      />
    </div>

    <!-- Pills -->
    <div v-else class="mt-6 flex flex-wrap gap-3">
      <span
        v-for="skill in skills"
        :key="skill.id"
        :class="colorFor(skill.category)"
        class="rounded-full border px-4 py-1.5 text-sm font-medium transition hover:scale-105"
      >
        {{ skill.name }}
      </span>
    </div>
  </section>
</template>
