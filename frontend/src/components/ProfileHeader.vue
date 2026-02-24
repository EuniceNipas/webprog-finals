<script setup>
</script>

<template>
  <!-- Hero / Profile Header -->
  <section class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-200 p-8 md:p-14 shadow-2xl shadow-pink-300/50 border-2 border-pink-300">
    <!-- Animated gradient background overlay -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-pink-400/20 via-transparent to-fuchsia-400/20 animate-pulse" style="animation-duration: 4s" />

    <!-- Decorative blobs with more color -->
    <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-400/30 blur-3xl animate-float" />
    <div class="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-pink-400/25 blur-2xl animate-float" style="animation-delay: 1.5s" />
    <div class="pointer-events-none absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-purple-300/20 blur-2xl animate-float" style="animation-delay: 0.8s" />
    <div class="pointer-events-none absolute -top-8 left-1/2 h-36 w-36 rounded-full bg-rose-300/20 blur-3xl animate-float" style="animation-delay: 2s" />

    <!-- Floating decorative elements -->
    <div class="pointer-events-none absolute top-4 right-8 text-3xl animate-float text-pink-400/60">♡</div>
    <div class="pointer-events-none absolute top-12 right-28 text-xl animate-wiggle text-fuchsia-400/50" style="animation-delay: 0.5s">✿</div>
    <div class="pointer-events-none absolute bottom-6 left-10 text-2xl animate-float text-rose-400/50" style="animation-delay: 1s">♡</div>
    <div class="pointer-events-none absolute bottom-12 right-16 text-lg animate-wiggle text-purple-400/40" style="animation-delay: 1.5s">✦</div>
    <div class="pointer-events-none absolute top-8 left-16 text-xl animate-sparkle text-pink-400/40" style="animation-delay: 0.3s">⋆</div>
    <div class="pointer-events-none absolute bottom-4 left-1/3 text-2xl animate-float text-fuchsia-300/40" style="animation-delay: 2.2s">♡</div>
    <div class="pointer-events-none absolute top-1/3 right-6 text-lg animate-sparkle text-rose-300/50" style="animation-delay: 0.7s">✿</div>
    <div class="pointer-events-none absolute top-20 left-1/2 text-sm animate-wiggle text-purple-400/30" style="animation-delay: 1.8s">⋆</div>

    <div class="relative z-10 flex flex-col items-center text-center gap-6">
      <!-- Avatar with enhanced glow -->
      <div class="relative group">
        <div class="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 blur-lg opacity-60 animate-sparkle group-hover:opacity-80 transition-opacity duration-500" />
        <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-300 to-fuchsia-300 opacity-80 animate-spin" style="animation-duration: 8s" />
        <img
          src="/gallery/assets/eunice.jpg"
          alt="Eunice Nipas"
          class="relative h-36 w-36 rounded-full border-4 border-white object-cover shadow-xl shadow-pink-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-400/50"
        />
      </div>

      <!-- Text with gradient -->
      <div class="animate-fade-in-up">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm" style="font-family: 'Pacifico', cursive;">
          Eunice B. Nipas
        </h1>
        <p class="mt-3 text-lg font-bold text-pink-500 animate-fade-in-up" style="animation-delay: 0.2s">
          <span class="animate-wiggle inline-block">✿</span>
          Welcome to my final project in webprog
          <span class="animate-wiggle inline-block" style="animation-delay: 0.5s">✿</span>
        </p>
        <!-- Decorative dots -->
        <div class="mt-4 flex justify-center gap-2">
          <div class="h-2 w-2 rounded-full bg-pink-400 animate-sparkle" />
          <div class="h-2 w-2 rounded-full bg-fuchsia-400 animate-sparkle" style="animation-delay: 0.3s" />
          <div class="h-2 w-2 rounded-full bg-purple-400 animate-sparkle" style="animation-delay: 0.6s" />
          <div class="h-2 w-2 rounded-full bg-rose-400 animate-sparkle" style="animation-delay: 0.9s" />
          <div class="h-2 w-2 rounded-full bg-pink-400 animate-sparkle" style="animation-delay: 1.2s" />
        </div>
      </div>
    </div>
  </section>
</template>
