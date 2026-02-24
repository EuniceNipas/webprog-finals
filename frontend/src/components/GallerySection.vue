<script setup>
import { ref } from 'vue'

const images = [
  'Badminton.jpg',
  'cat.jpg',
  'drinks.jpg',
  'eunice.jpg',
  'family.jpg',
  'firstrun.jpg',
  'g4.jpg',
  'loml.jpg',
]

const basePath = '/gallery/assets/'
const lightboxImage = ref(null)

function openLightbox(image) {
  lightboxImage.value = image
}

function closeLightbox() {
  lightboxImage.value = null
}
</script>

<template>
  <section>
    <h2 class="text-center text-2xl font-extrabold text-pink-500 sm:text-3xl" style="font-family: 'Pacifico', cursive;">
      ✿ Gallery ✿
    </h2>

    <div class="mt-8 kawaii-card p-5 sm:p-6">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="image in images"
          :key="image"
          @click="openLightbox(image)"
          class="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-pink-200 bg-pink-50 shadow-md shadow-pink-100/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-300/50 hover:border-pink-400"
        >
          <img
            :src="basePath + image"
            :alt="image"
            class="h-32 w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90 sm:h-36"
            loading="lazy"
          />
          <!-- Hover overlay -->
          <div class="absolute inset-0 flex items-center justify-center bg-pink-400/0 transition-all duration-300 group-hover:bg-pink-400/30">
            <span class="text-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-50">🔍</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Lightbox modal -->
    <Teleport to="body">
      <div
        v-if="lightboxImage"
        @click="closeLightbox"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 cursor-pointer"
      >
        <div class="relative max-h-[85vh] max-w-3xl animate-fade-in-up" @click.stop>
          <!-- Close button -->
          <button
            @click="closeLightbox"
            class="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-pink-400 text-white shadow-lg transition-all hover:bg-pink-500 hover:scale-110"
          >
            ✕
          </button>
          <img
            :src="basePath + lightboxImage"
            :alt="lightboxImage"
            class="max-h-[80vh] w-auto rounded-3xl border-4 border-white shadow-2xl shadow-pink-300/30 object-contain"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>
