<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase.js'

const entries = ref([])
const loading = ref(true)
const form = ref({ name: '', message: '' })
const sending = ref(false)

onMounted(async () => {
  await fetchEntries()
})

async function fetchEntries() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    entries.value = data
  } catch (e) {
    console.error('Failed to load guestbook', e)
  } finally {
    loading.value = false
  }
}

async function submit() {
  if (!form.value.name.trim() || !form.value.message.trim()) return
  sending.value = true
  try {
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: form.value.name, message: form.value.message }])
      .select()
      .single()
    if (error) throw error
    entries.value.unshift(data)
    form.value = { name: '', message: '' }
  } catch (e) {
    console.error('Guestbook post failed', e)
  } finally {
    sending.value = false
  }
}

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  const intervals = [
    { label: 'y', s: 31536000 },
    { label: 'mo', s: 2592000 },
    { label: 'd', s: 86400 },
    { label: 'h', s: 3600 },
    { label: 'm', s: 60 },
  ]
  for (const i of intervals) {
    const count = Math.floor(seconds / i.s)
    if (count >= 1) return ` ago`
  }
  return 'just now'
}
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Guestbook</h2>
    <form @submit.prevent="submit" class="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900/60 p-6 sm:flex-row sm:items-end">
      <input v-model="form.name" required type="text" placeholder="Your name" class="flex-1 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-indigo-500" />
      <input v-model="form.message" required type="text" placeholder="Leave a message..." class="flex-[2] rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-indigo-500" />
      <button type="submit" :disabled="sending" class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50">{{ sending ? 'Posting...' : 'Sign' }}</button>
    </form>
    <div class="mt-6 space-y-4">
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="h-14 animate-pulse rounded-xl bg-gray-800/40" />
      </div>
      <div v-for="entry in entries" :key="entry.id" class="rounded-xl border border-gray-800 bg-gray-900/40 px-5 py-3">
        <div class="flex items-baseline justify-between gap-2">
          <span class="font-medium text-indigo-400">{{ entry.name }}</span>
          <span class="whitespace-nowrap text-xs text-gray-500">{{ timeAgo(entry.created_at) }}</span>
        </div>
        <p class="mt-1 text-sm text-gray-300">{{ entry.message }}</p>
      </div>
      <p v-if="!loading && entries.length === 0" class="text-sm text-gray-500">No entries yet - be the first to sign the guestbook!</p>
    </div>
  </section>
</template>
