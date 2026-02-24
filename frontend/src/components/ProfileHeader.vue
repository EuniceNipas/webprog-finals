<script setup>
</script>

<template>
  <!-- Hero / Profile Header -->
  <section class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-200 via-pink-100 to-fuchsia-100 p-8 md:p-14 shadow-xl shadow-pink-200/40 border-2 border-pink-200">
    <!-- Decorative blobs -->
    <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl" />
    <div class="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-2xl" />

    <!-- Decorative hearts -->
    <div class="pointer-events-none absolute top-6 right-10 text-2xl animate-float opacity-40">♡</div>
    <div class="pointer-events-none absolute top-16 right-24 text-lg animate-float opacity-30" style="animation-delay: 0.5s">♡</div>
    <div class="pointer-events-none absolute bottom-8 left-12 text-xl animate-float opacity-30" style="animation-delay: 1s">♡</div>

    <div class="relative z-10 flex flex-col items-center text-center gap-6">
      <!-- Avatar -->
      <div class="relative">
        <div class="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-300 to-fuchsia-300 blur-md opacity-60 animate-sparkle" />
        <img
          src="/gallery/assets/eunice.jpg"
          alt="Eunice Nipas"
          class="relative h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg shadow-pink-300/40"
        />
      </div>

      <!-- Text -->
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-pink-600 sm:text-4xl lg:text-5xl" style="font-family: 'Pacifico', cursive;">
          Eunice B. Nipas
        </h1>
        <p class="mt-2 text-lg font-bold text-pink-400">✿ Welcome to my little corner of the internet ✿</p>
      </div>
    </div>
  </section>
</template>
