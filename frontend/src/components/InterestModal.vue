<script setup>
import { ref, watch, computed, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  interest: { type: Object, default: null },
})
const emit = defineEmits(['close'])

const currentSlide = ref(0)
let autoTimer = null

const media = computed(() => props.interest?.media || [])
const current = computed(() => media.value[currentSlide.value])
const isVideo = computed(() => current.value?.type === 'video')
const total = computed(() => media.value.length)

watch(() => props.show, (val) => {
  currentSlide.value = 0
  clearInterval(autoTimer)
  if (val && total.value > 1) {
    startAuto()
  }
})

function startAuto() {
  clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    if (total.value <= 1) return
    // Don't auto-advance if current is video
    if (current.value?.type === 'video') return
    currentSlide.value = (currentSlide.value + 1) % total.value
  }, 3500)
}

function prev() {
  clearInterval(autoTimer)
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : total.value - 1
  startAuto()
}

function next() {
  clearInterval(autoTimer)
  currentSlide.value = (currentSlide.value + 1) % total.value
  startAuto()
}

function goTo(i) {
  clearInterval(autoTimer)
  currentSlide.value = i
  startAuto()
}

function closeModal() {
  clearInterval(autoTimer)
  emit('close')
}

onUnmounted(() => clearInterval(autoTimer))
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
        v-if="show && interest"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl p-4 sm:p-6"
        @click="closeModal"
      >
        <!-- Modal card -->
        <div
          class="relative w-full max-w-lg rounded-[2rem] border-2 border-pink-200 bg-gradient-to-b from-white via-pink-50 to-fuchsia-50 dark:border-purple-500/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 shadow-2xl shadow-pink-300/30 dark:shadow-purple-900/40 animate-fade-in-up overflow-hidden"
          @click.stop
        >
          <!-- Close button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-pink-100/80 dark:bg-gray-800/80 text-pink-400 dark:text-purple-400 transition-all duration-300 hover:scale-110 hover:bg-pink-200 dark:hover:bg-purple-500/30"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Header -->
          <div class="pt-6 pb-2 text-center">
            <p class="text-2xl font-extrabold text-pink-500 dark:text-purple-400" style="font-family: 'Pacifico', cursive;">
              {{ interest.emoji }} {{ interest.label }}
            </p>
            <p v-if="total > 1" class="mt-1 text-[10px] font-semibold text-pink-300 dark:text-purple-600">
              {{ currentSlide + 1 }} / {{ total }}
            </p>
          </div>

          <!-- Media display -->
          <div class="relative px-6 py-4">
            <div class="relative overflow-hidden rounded-2xl border-2 border-pink-200 dark:border-purple-500/30 shadow-lg bg-black/5 dark:bg-black/20">
              <!-- Video -->
              <video
                v-if="isVideo"
                :key="current.src"
                :src="current.src"
                controls
                autoplay
                class="w-full rounded-2xl max-h-[60vh] object-contain"
              />
              <!-- Image -->
              <img
                v-else
                :key="current.src"
                :src="current.src"
                :alt="current.caption || interest.label"
                class="w-full rounded-2xl max-h-[60vh] object-contain transition-all duration-500"
              />
            </div>

            <!-- Prev / Next arrows (only if multiple media) -->
            <template v-if="total > 1">
              <button
                @click="prev"
                class="absolute left-8 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 border-2 border-pink-200 dark:border-purple-500/30 text-pink-500 dark:text-purple-400 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                @click="next"
                class="absolute right-8 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 border-2 border-pink-200 dark:border-purple-500/30 text-pink-500 dark:text-purple-400 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </template>
          </div>

          <!-- Caption -->
          <div v-if="current?.caption" class="text-center px-8 pb-2">
            <p class="text-sm font-bold text-pink-600 dark:text-purple-300">{{ current.caption }}</p>
          </div>

          <!-- Dots (if multiple media) -->
          <div v-if="total > 1" class="flex justify-center gap-2 pb-6 pt-2">
            <button
              v-for="(item, i) in media"
              :key="i"
              @click="goTo(i)"
              class="h-2.5 rounded-full transition-all duration-300"
              :class="currentSlide === i
                ? 'w-8 bg-pink-400 dark:bg-purple-400'
                : 'w-2.5 bg-pink-200 dark:bg-purple-700 hover:bg-pink-300 dark:hover:bg-purple-500'"
            />
          </div>

          <!-- Single item bottom padding -->
          <div v-else class="pb-6" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>
