<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/projects')
    projects.value = data
  } catch (e) {
    console.error('Failed to load projects', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Projects</h2>

    <!-- Loading skeleton -->
    <div v-if="loading" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 3"
        :key="i"
        class="h-64 animate-pulse rounded-2xl bg-gray-800/60"
      />
    </div>

    <!-- Cards -->
    <div v-else class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="project in projects"
        :key="project.id"
        class="group flex flex-col rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow transition hover:border-indigo-500/50 hover:shadow-indigo-500/10"
      >
        <!-- Optional image -->
        <img
          v-if="project.image_url"
          :src="project.image_url"
          :alt="project.title"
          class="mb-4 h-40 w-full rounded-xl object-cover"
        />

        <h3 class="text-lg font-semibold group-hover:text-indigo-400 transition">
          {{ project.title }}
        </h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
          {{ project.description }}
        </p>

        <!-- Tech tags -->
        <div v-if="project.tech_stack" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tech in (Array.isArray(project.tech_stack) ? project.tech_stack : project.tech_stack.split(','))"
            :key="tech"
            class="rounded-md bg-gray-800 px-2 py-0.5 text-xs text-gray-400"
          >
            {{ tech.trim() }}
          </span>
        </div>

        <!-- Links -->
        <div class="mt-4 flex gap-3">
          <a
            v-if="project.repo_url"
            :href="project.repo_url"
            target="_blank"
            class="text-sm font-medium text-indigo-400 underline-offset-2 hover:underline"
          >
            Source
          </a>
          <a
            v-if="project.live_url"
            :href="project.live_url"
            target="_blank"
            class="text-sm font-medium text-indigo-400 underline-offset-2 hover:underline"
          >
            Live Demo
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
