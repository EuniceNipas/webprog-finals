<script setup>
const images = [
  'Badminton.jpg',
  'cat.jpg',
  'Draw.jpg',
  'drinks.jpg',
  'eunice.jpg',
  'family.jpg',
  'firstrun.jpg',
  'g4.jpg',
  'Gaming.jpg',
  'loml.jpg',
  'Music.jpg',
  'Run.jpg',
]

const basePath = '/gallery/assets/'
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Gallery</h2>

    <div class="mt-6 rounded-2xl border border-gray-800 bg-gray-900/60 p-4 sm:p-6">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="image in images"
          :key="image"
          class="overflow-hidden rounded-xl border border-gray-800 bg-gray-950/70"
        >
          <img
            :src="basePath + image"
            :alt="image"
            class="h-28 w-full object-cover sm:h-32"
            loading="lazy"
          />
        </article>
      </div>
    </div>
  </section>
</template>
