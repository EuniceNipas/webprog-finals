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
    if (count >= 1) return `${count}${i.label} ago`
  }
  return 'just now'
}
</script>

<template>
  <section>
    <h2 class="text-center text-2xl font-extrabold text-pink-500 dark:text-purple-400 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
       Guestbook 
    </h2>

    <!-- Intro text -->
    <p class="mt-4 text-center text-sm font-medium text-pink-400 dark:text-purple-400">
      Hello there!  Thanks for visiting my website. Feel free to leave a message here~
    </p>

    <!-- Guestbook container box -->
    <div class="mt-6 kawaii-card p-6 sm:p-8">
      <!-- Post form -->
      <form
        @submit.prevent="submit"
        class="space-y-4"
      >
        <div class="flex flex-col gap-4 sm:flex-row">
          <input
            v-model="form.name"
            required
            type="text"
            placeholder="Your name "
            class="flex-1 rounded-2xl border-2 border-pink-200 bg-pink-50/50 dark:border-purple-500/30 dark:bg-gray-800/60 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-pink-300 dark:placeholder-purple-500 outline-none transition-all duration-300 focus:border-pink-400 dark:focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800 focus:shadow-md focus:shadow-pink-200/50 dark:focus:shadow-purple-500/20"
          />
          <input
            v-model="form.message"
            required
            type="text"
            placeholder="Leave a cute message~ "
            class="flex-[2] rounded-2xl border-2 border-pink-200 bg-pink-50/50 dark:border-purple-500/30 dark:bg-gray-800/60 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-pink-300 dark:placeholder-purple-500 outline-none transition-all duration-300 focus:border-pink-400 dark:focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800 focus:shadow-md focus:shadow-pink-200/50 dark:focus:shadow-purple-500/20"
          />
        </div>
        <div class="text-center sm:text-right">
          <button
            type="submit"
            :disabled="sending"
            class="btn-bubble inline-flex items-center gap-2"
          >
            <span>{{ sending ? 'Posting~ ' : ' Sign Guestbook ' }}</span>
          </button>
        </div>
      </form>

      <!-- Divider -->
      <div class="my-5 border-t-2 border-pink-100 dark:border-purple-500/20" />

      <!-- Scrollable entries list -->
      <div class="max-h-72 overflow-y-auto space-y-3 pr-2" style="scrollbar-width: thin; scrollbar-color: #f9a8d4 #fff0f5;">
        <div v-if="loading" class="space-y-3">
          <div
            v-for="i in 3"
            :key="i"
            class="h-16 animate-pulse rounded-2xl bg-pink-100/60 dark:bg-purple-500/10"
          />
        </div>

        <div
          v-for="entry in entries"
          :key="entry.id"
          class="rounded-2xl border-2 border-pink-200 bg-pink-50/60 dark:border-purple-500/30 dark:bg-gray-800/60 px-5 py-4 transition-all duration-300 hover:border-pink-300 dark:hover:border-purple-400 hover:shadow-md hover:shadow-pink-100/50 dark:hover:shadow-purple-500/20 hover:bg-pink-50 dark:hover:bg-gray-800"
        >
          <div class="flex items-baseline justify-between gap-2">
            <span class="font-bold text-pink-500 dark:text-purple-400"> {{ entry.name }}</span>
            <span class="whitespace-nowrap text-xs font-medium text-pink-300 dark:text-purple-500">
              {{ timeAgo(entry.created_at) }}
            </span>
          </div>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 font-medium">{{ entry.message }}</p>
        </div>

        <p v-if="!loading && entries.length === 0" class="text-center text-sm font-medium text-pink-400 dark:text-purple-400 py-6">
          No entries yet  be the first to sign the guestbook! 
        </p>
      </div>
    </div>
  </section>
</template>