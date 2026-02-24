<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const profile = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/profile')
    profile.value = data
  } catch (e) {
    console.error('Failed to load profile', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Skeleton while loading -->
  <section
    v-if="loading"
    class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 to-gray-900 p-8 md:p-14 animate-pulse"
  >
    <div class="flex flex-col items-center gap-6 md:flex-row md:items-start">
      <div class="h-32 w-32 rounded-full bg-gray-700/50 shrink-0" />
      <div class="flex-1 space-y-4 text-center md:text-left">
        <div class="mx-auto h-8 w-48 rounded bg-gray-700/50 md:mx-0" />
        <div class="mx-auto h-4 w-64 rounded bg-gray-700/40 md:mx-0" />
        <div class="mx-auto h-20 w-full max-w-lg rounded bg-gray-700/30 md:mx-0" />
      </div>
    </div>
  </section>

  <!-- Loaded content -->
  <section
    v-else-if="profile"
    class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 to-gray-900 p-8 md:p-14 shadow-xl shadow-indigo-900/10"
  >
    <!-- Decorative blob -->
    <div
      class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"
    />

    <div class="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
      <!-- Avatar -->
      <img
        :src="profile.avatar_url || 'https://ui-avatars.com/api/?name=' + profile.name + '&size=256&background=6366f1&color=fff'"
        :alt="profile.name"
        class="h-32 w-32 rounded-full border-4 border-indigo-500/40 object-cover shadow-lg shadow-indigo-500/20 shrink-0"
      />

      <!-- Text -->
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {{ profile.name }}
        </h1>
        <p class="mt-1 text-lg font-medium text-indigo-400">
          {{ profile.headline }}
        </p>
        <p class="mt-4 max-w-2xl leading-relaxed text-gray-300">
          {{ profile.bio }}
        </p>

        <!-- Social links -->
        <div class="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          <a
            v-if="profile.github_url"
            :href="profile.github_url"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/60 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-indigo-500 hover:text-white"
          >
            GitHub
          </a>
          <a
            v-if="profile.linkedin_url"
            :href="profile.linkedin_url"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/60 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-indigo-500 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            v-if="profile.email"
            :href="'mailto:' + profile.email"
            class="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/60 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-indigo-500 hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
