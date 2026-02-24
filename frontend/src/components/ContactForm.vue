<script setup>
import { ref } from 'vue'
import api from '../api'

const form = ref({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | success | error
const errorMsg = ref('')

async function submit() {
  status.value = 'sending'
  errorMsg.value = ''
  try {
    await api.post('/contact', form.value)
    status.value = 'success'
    form.value = { name: '', email: '', message: '' }
  } catch (e) {
    status.value = 'error'
    errorMsg.value = e.response?.data?.message || 'Something went wrong.'
  }
}
</script>

<template>
  <section id="contact">
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Contact Me</h2>

    <!-- Success banner -->
    <div
      v-if="status === 'success'"
      class="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300"
    >
      Thanks for reaching out! I'll get back to you soon.
    </div>

    <form
      v-else
      @submit.prevent="submit"
      class="mt-6 grid gap-5 rounded-2xl border border-gray-800 bg-gray-900/60 p-6 sm:p-8"
    >
      <!-- Name -->
      <div>
        <label for="name" class="mb-1 block text-sm font-medium text-gray-400">
          Name
        </label>
        <input
          id="name"
          v-model="form.name"
          required
          type="text"
          placeholder="Your name"
          class="w-full rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-gray-400">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          required
          type="email"
          placeholder="you@example.com"
          class="w-full rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="mb-1 block text-sm font-medium text-gray-400">
          Message
        </label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="4"
          placeholder="Write your message…"
          class="w-full resize-none rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <!-- Error -->
      <p v-if="status === 'error'" class="text-sm text-red-400">{{ errorMsg }}</p>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="status === 'sending'"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        <svg
          v-if="status === 'sending'"
          class="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            class="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        {{ status === 'sending' ? 'Sending…' : 'Send Message' }}
      </button>
    </form>
  </section>
</template>
