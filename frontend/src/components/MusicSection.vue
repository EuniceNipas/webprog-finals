<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])

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

const currentIndex = ref(0)
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

function togglePlay() {
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
    cancelAnimationFrame(rafId)
  } else {
    if (!audio.src || audio.src !== location.origin + tracks[currentIndex.value].src) {
      audio.src = tracks[currentIndex.value].src
      audio.load()
    }
    audio.play()
    isPlaying.value = true
    rafId = requestAnimationFrame(updateProgress)
  }
}

function loadAndPlay(index) {
  currentIndex.value = index
  progress.value = 0
  currentTime.value = 0
  duration.value = 0
  audio.src = tracks[index].src
  audio.load()
  audio.play()
  isPlaying.value = true
  rafId = requestAnimationFrame(updateProgress)
}

function prevTrack() {
  const prev = currentIndex.value > 0 ? currentIndex.value - 1 : tracks.length - 1
  loadAndPlay(prev)
}

function nextTrack() {
  const next = currentIndex.value < tracks.length - 1 ? currentIndex.value + 1 : 0
  loadAndPlay(next)
}

function seek(e) {
  if (!audio.duration) return
  const rect = e.currentTarget.getBoundingClientRect()
  const pct = (e.clientX - rect.left) / rect.width
  audio.currentTime = pct * audio.duration
  progress.value = pct * 100
}

function closePlayer() {
  audio.pause()
  isPlaying.value = false
  cancelAnimationFrame(rafId)
  emit('close')
}

audio.addEventListener('ended', () => {
  isPlaying.value = false
  cancelAnimationFrame(rafId)
  if (currentIndex.value < tracks.length - 1) {
    nextTrack()
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
  <Teleport to="body">
    <transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl p-4 sm:p-6"
        @click="closePlayer"
      >
        <!-- Player card -->
        <div
          class="relative w-full max-w-md rounded-[2rem] border-2 border-pink-200 bg-gradient-to-b from-white via-pink-50 to-fuchsia-50 dark:border-purple-500/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 shadow-2xl shadow-pink-300/30 dark:shadow-purple-900/40 animate-fade-in-up overflow-hidden"
          @click.stop
        >
          <!-- Close button -->
          <button
            @click="closePlayer"
            class="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-pink-100/80 dark:bg-gray-800/80 text-pink-400 dark:text-purple-400 transition-all duration-300 hover:scale-110 hover:bg-pink-200 dark:hover:bg-purple-500/30"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Header -->
          <div class="pt-6 pb-2 text-center">
            <p class="text-xs font-bold uppercase tracking-widest text-pink-400 dark:text-purple-500">Now Playing</p>
            <p class="mt-1 text-[10px] font-semibold text-pink-300 dark:text-purple-600">{{ currentIndex + 1 }} / {{ tracks.length }}</p>
          </div>

          <!-- Album art -->
          <div class="flex justify-center px-8 py-4">
            <div class="relative">
              <!-- Glow ring -->
              <div
                class="absolute -inset-3 rounded-3xl blur-xl transition-opacity duration-700"
                :class="isPlaying ? 'bg-pink-400/30 dark:bg-purple-500/25 opacity-100' : 'opacity-0'"
              />
              <img
                :src="tracks[currentIndex].cover"
                :alt="tracks[currentIndex].title"
                class="relative h-64 w-64 sm:h-72 sm:w-72 rounded-3xl object-cover border-2 border-pink-200 dark:border-purple-500/30 shadow-xl transition-all duration-700"
                :class="isPlaying ? 'scale-100 shadow-pink-300/50 dark:shadow-purple-500/30' : 'scale-95 shadow-pink-200/30'"
              />
              <!-- Equalizer bars -->
              <div v-if="isPlaying" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-[3px]">
                <span class="inline-block w-1.5 rounded-full bg-white/90 animate-bounce" style="height: 14px; animation-delay: 0s; animation-duration: 0.5s" />
                <span class="inline-block w-1.5 rounded-full bg-white/90 animate-bounce" style="height: 22px; animation-delay: 0.12s; animation-duration: 0.5s" />
                <span class="inline-block w-1.5 rounded-full bg-white/90 animate-bounce" style="height: 12px; animation-delay: 0.24s; animation-duration: 0.5s" />
                <span class="inline-block w-1.5 rounded-full bg-white/90 animate-bounce" style="height: 18px; animation-delay: 0.08s; animation-duration: 0.5s" />
                <span class="inline-block w-1.5 rounded-full bg-white/90 animate-bounce" style="height: 10px; animation-delay: 0.2s; animation-duration: 0.5s" />
              </div>
            </div>
          </div>

          <!-- Track info -->
          <div class="text-center px-8">
            <h3 class="text-xl font-extrabold text-pink-600 dark:text-purple-300" style="font-family: 'Pacifico', cursive;">
              {{ tracks[currentIndex].title }}
            </h3>
            <p class="mt-1 text-sm font-semibold text-pink-400 dark:text-purple-500">
              {{ tracks[currentIndex].artist }}
            </p>
          </div>

          <!-- Progress bar -->
          <div class="px-8 mt-5">
            <div
              @click="seek"
              class="h-2 w-full cursor-pointer rounded-full bg-pink-100 dark:bg-gray-700 overflow-hidden"
            >
              <div
                class="h-full rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 dark:from-purple-500 dark:to-fuchsia-500 transition-[width] duration-100"
                :style="{ width: progress + '%' }"
              />
            </div>
            <div class="mt-1 flex justify-between text-[10px] font-bold text-pink-300 dark:text-purple-600">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-center gap-5 px-8 pb-8 pt-4">
            <!-- Prev -->
            <button
              @click="prevTrack"
              class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-pink-200 bg-white/80 dark:border-purple-500/30 dark:bg-gray-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-200/50 dark:hover:shadow-purple-500/20"
              title="Previous"
            >
              <svg class="h-5 w-5 text-pink-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <!-- Play / Pause -->
            <button
              @click="togglePlay"
              class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 dark:from-purple-500 dark:to-fuchsia-600 text-white shadow-lg shadow-pink-400/40 dark:shadow-purple-500/40 transition-all duration-300 hover:scale-110 hover:shadow-xl"
            >
              <svg v-if="isPlaying" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
              <svg v-else class="h-7 w-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>

            <!-- Next -->
            <button
              @click="nextTrack"
              class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-pink-200 bg-white/80 dark:border-purple-500/30 dark:bg-gray-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-200/50 dark:hover:shadow-purple-500/20"
              title="Next"
            >
              <svg class="h-5 w-5 text-pink-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          <!-- Track list dots -->
          <div class="flex justify-center gap-2 pb-6">
            <button
              v-for="(track, i) in tracks"
              :key="i"
              @click="loadAndPlay(i)"
              class="h-2.5 rounded-full transition-all duration-300"
              :class="currentIndex === i
                ? 'w-8 bg-pink-400 dark:bg-purple-400'
                : 'w-2.5 bg-pink-200 dark:bg-purple-700 hover:bg-pink-300 dark:hover:bg-purple-500'"
              :title="track.title"
            />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>