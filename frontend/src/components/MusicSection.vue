<script setup>
import { ref, watch, onUnmounted } from 'vue'

const tracks = [
  {
    title: '12 Fractures',
    artist: 'Pierce The Veil',
    cover: '/music/12-fractures.jfif',
    src: '/music/12-fractures.mp3',
  },
  {
    title: 'Back to You',
    artist: 'Not for Radio',
    cover: '/music/back-to-you.jfif',
    src: '/music/back-to-you.mp3',
  },
  {
    title: 'Folktales',
    artist: 'Michael Seyer',
    cover: '/music/folktales.jfif',
    src: '/music/folktales.mp3',
  },
]

const currentIndex = ref(null)
const isPlaying = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const audio = new Audio()

let rafId = null

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function updateProgress() {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100
    currentTime.value = audio.currentTime
    duration.value = audio.duration
  }
  if (isPlaying.value) {
    rafId = requestAnimationFrame(updateProgress)
  }
}

function playTrack(index) {
  if (currentIndex.value === index && isPlaying.value) {
    audio.pause()
    isPlaying.value = false
    cancelAnimationFrame(rafId)
    return
  }

  if (currentIndex.value !== index) {
    audio.src = tracks[index].src
    audio.load()
    currentIndex.value = index
    progress.value = 0
    currentTime.value = 0
    duration.value = 0
  }

  audio.play()
  isPlaying.value = true
  rafId = requestAnimationFrame(updateProgress)
}

function seek(e) {
  if (!audio.duration) return
  const rect = e.currentTarget.getBoundingClientRect()
  const pct = (e.clientX - rect.left) / rect.width
  audio.currentTime = pct * audio.duration
  progress.value = pct * 100
}

audio.addEventListener('ended', () => {
  isPlaying.value = false
  cancelAnimationFrame(rafId)
  // Auto-play next track
  if (currentIndex.value < tracks.length - 1) {
    playTrack(currentIndex.value + 1)
  } else {
    progress.value = 0
    currentTime.value = 0
  }
})

audio.addEventListener('loadedmetadata', () => {
  duration.value = audio.duration
})

onUnmounted(() => {
  audio.pause()
  audio.src = ''
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="music">
    <h2 class="text-center text-2xl font-extrabold text-pink-500 dark:text-purple-400 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
      ✿ My Vibes ✿
    </h2>

    <p class="mt-3 text-center text-sm font-medium text-pink-400 dark:text-purple-400">
      🎵 Here are some songs I vibe to~ Click to play! 🎵
    </p>

    <div class="mt-8 grid gap-5 sm:grid-cols-3">
      <div
        v-for="(track, i) in tracks"
        :key="track.title"
        @click="playTrack(i)"
        class="group relative cursor-pointer overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
        :class="[
          currentIndex === i
            ? 'border-pink-400 dark:border-purple-400 shadow-xl shadow-pink-300/40 dark:shadow-purple-500/30'
            : 'border-pink-200 dark:border-purple-500/30 shadow-lg shadow-pink-100/50 dark:shadow-purple-900/30 hover:border-pink-400 dark:hover:border-purple-400 hover:shadow-xl'
        ]"
      >
        <!-- Album cover -->
        <div class="relative">
          <img
            :src="track.cover"
            :alt="track.title"
            class="h-48 w-full object-cover transition-all duration-500"
            :class="currentIndex === i && isPlaying ? 'brightness-75' : 'group-hover:brightness-90'"
          />

          <!-- Play/Pause overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg transition-all duration-300"
              :class="currentIndex === i && isPlaying
                ? 'scale-100 opacity-100'
                : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'"
            >
              <!-- Pause icon -->
              <svg v-if="currentIndex === i && isPlaying" class="h-6 w-6 text-pink-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
              <!-- Play icon -->
              <svg v-else class="h-6 w-6 ml-1 text-pink-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <!-- Now-playing indicator -->
          <div v-if="currentIndex === i && isPlaying" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-[3px]">
            <span class="inline-block w-1 rounded-full bg-white animate-bounce" style="height: 12px; animation-delay: 0s; animation-duration: 0.6s" />
            <span class="inline-block w-1 rounded-full bg-white animate-bounce" style="height: 18px; animation-delay: 0.15s; animation-duration: 0.6s" />
            <span class="inline-block w-1 rounded-full bg-white animate-bounce" style="height: 10px; animation-delay: 0.3s; animation-duration: 0.6s" />
            <span class="inline-block w-1 rounded-full bg-white animate-bounce" style="height: 16px; animation-delay: 0.1s; animation-duration: 0.6s" />
          </div>
        </div>

        <!-- Track info -->
        <div class="bg-white/80 dark:bg-gray-900/80 p-4 text-center transition-colors duration-500">
          <p class="text-sm font-extrabold text-pink-600 dark:text-purple-300">{{ track.title }}</p>
          <p class="mt-0.5 text-xs font-medium text-pink-400 dark:text-purple-500">{{ track.artist }}</p>
        </div>
      </div>
    </div>

    <!-- Now-playing bar -->
    <div
      v-if="currentIndex !== null"
      class="mt-6 kawaii-card p-4 sm:p-5 animate-fade-in-up"
    >
      <div class="flex items-center gap-4">
        <!-- Mini cover -->
        <img
          :src="tracks[currentIndex].cover"
          :alt="tracks[currentIndex].title"
          class="h-12 w-12 rounded-xl object-cover border-2 border-pink-200 dark:border-purple-500/30 shadow-md"
          :class="isPlaying ? 'animate-spin' : ''"
          :style="isPlaying ? 'animation-duration: 4s' : ''"
        />

        <div class="flex-1 min-w-0">
          <!-- Title + artist -->
          <div class="flex items-baseline gap-2">
            <p class="truncate text-sm font-bold text-pink-600 dark:text-purple-300">
              {{ tracks[currentIndex].title }}
            </p>
            <span class="text-xs font-medium text-pink-400 dark:text-purple-500 whitespace-nowrap">
              — {{ tracks[currentIndex].artist }}
            </span>
          </div>

          <!-- Progress bar -->
          <div
            @click.stop="seek"
            class="mt-2 h-2 w-full cursor-pointer rounded-full bg-pink-100 dark:bg-gray-700 overflow-hidden group/bar"
          >
            <div
              class="h-full rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 dark:from-purple-500 dark:to-fuchsia-500 transition-[width] duration-100"
              :style="{ width: progress + '%' }"
            />
          </div>

          <!-- Time -->
          <div class="mt-1 flex justify-between text-[10px] font-bold text-pink-300 dark:text-purple-500">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Play/Pause button -->
        <button
          @click.stop="playTrack(currentIndex)"
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-pink-200 bg-white/80 dark:border-purple-500/30 dark:bg-gray-800/80 transition-all duration-300 hover:scale-110 hover:shadow-md"
        >
          <svg v-if="isPlaying" class="h-5 w-5 text-pink-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
          <svg v-else class="h-5 w-5 ml-0.5 text-pink-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
