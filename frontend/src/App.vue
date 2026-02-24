<script setup>
import ProfileHeader from './components/ProfileHeader.vue'
import AboutMeSection from './components/AboutMeSection.vue'
import InterestSection from './components/InterestSection.vue'
import EducationSection from './components/EducationSection.vue'
import GallerySection from './components/GallerySection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactForm from './components/ContactForm.vue'
import GuestbookSection from './components/GuestbookSection.vue'
import MusicSection from './components/MusicSection.vue'

import { ref, nextTick, onMounted } from 'vue'

const mobileOpen = ref(false)
const isDark = ref(false)
const showMusic = ref(false)

function toggleMusic() {
  showMusic.value = !showMusic.value
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

function toggleDark() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Interest', href: '#interest' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Guestbook', href: '#guestbook' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <div class="min-h-screen bg-pink-50 text-gray-700 dark:bg-gray-950 dark:text-gray-200 transition-colors duration-500">
    <!-- Floating decorative elements -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div class="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-pink-200/30 dark:bg-purple-500/15 blur-3xl animate-float" />
      <div class="absolute top-1/4 -right-20 h-60 w-60 rounded-full bg-pink-300/20 dark:bg-fuchsia-500/10 blur-3xl animate-float" style="animation-delay: 1s" />
      <div class="absolute bottom-1/4 -left-10 h-48 w-48 rounded-full bg-fuchsia-200/20 dark:bg-purple-600/10 blur-3xl animate-float" style="animation-delay: 2s" />
    </div>

    <!-- Navbar -->
    <nav class="sticky top-0 z-50 border-b-2 border-pink-200 bg-white/80 backdrop-blur-lg shadow-sm shadow-pink-100/50 dark:border-purple-500/30 dark:bg-gray-900/80 dark:shadow-purple-900/20 transition-colors duration-500">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <span class="text-xl font-extrabold tracking-tight" style="font-family: 'Pacifico', cursive;">
          <span class="text-pink-400 dark:text-purple-400">♡</span>
          <span class="bg-gradient-to-r from-pink-400 to-fuchsia-400 dark:from-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Eunice</span>
          <span class="text-pink-400 dark:text-purple-400">♡</span>
        </span>

        <div class="flex items-center gap-2">
          <!-- Desktop nav -->
          <div class="hidden gap-1 sm:flex">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="rounded-full px-4 py-2 text-sm font-bold text-pink-400 transition-all duration-300 hover:bg-pink-100 hover:text-pink-600 hover:scale-105 dark:text-purple-400 dark:hover:bg-purple-500/20 dark:hover:text-purple-300"
            >
              {{ link.label }}
            </a>
          </div>

          <!-- Dark mode toggle -->
          <button
            @click="toggleDark"
            class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-pink-200 bg-white/80 text-lg transition-all duration-300 hover:scale-110 hover:shadow-md dark:border-purple-500/30 dark:bg-gray-800/80 dark:hover:border-purple-400"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <span v-if="isDark" class="animate-wiggle">☀️</span>
            <span v-else class="animate-wiggle">🌙</span>
          </button>

          <!-- Mobile menu button -->
          <button @click="mobileOpen = !mobileOpen" class="sm:hidden rounded-full p-2 text-pink-400 hover:bg-pink-100 transition dark:text-purple-400 dark:hover:bg-purple-500/20">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile dropdown -->
      <div v-if="mobileOpen" class="sm:hidden border-t border-pink-200 bg-white/95 px-6 py-3 space-y-1 dark:border-purple-500/30 dark:bg-gray-900/95">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="mobileOpen = false"
          class="block rounded-2xl px-4 py-2 text-sm font-bold text-pink-400 transition hover:bg-pink-100 dark:text-purple-400 dark:hover:bg-purple-500/20"
        >
          {{ link.label }}
        </a>
      </div>
    </nav>

    <!-- Main content -->
    <main class="relative z-10 mx-auto max-w-5xl space-y-16 px-6 py-12">
      <ProfileHeader />

      <div id="about">
        <AboutMeSection />
      </div>

      <div id="interest">
        <InterestSection @open-music="toggleMusic" />
      </div>

      <div id="education">
        <EducationSection />
      </div>

      <div id="skills">
        <SkillsSection />
      </div>

      <div id="gallery">
        <GallerySection />
      </div>

      <div id="guestbook">
        <GuestbookSection />
      </div>

      <div id="contact">
        <ContactForm />
      </div>
    </main>

    <!-- Music Player Modal -->
    <MusicSection :show="showMusic" @close="showMusic = false" />

    <!-- Footer -->
    <footer class="relative z-10 border-t-2 border-pink-200 bg-white/60 py-8 text-center dark:border-purple-500/30 dark:bg-gray-900/60 transition-colors duration-500">
      <p class="text-sm font-semibold text-pink-400 dark:text-purple-400">
        ♡ Made with love by Eunice Nipas ♡
      </p>
      <p class="mt-1 text-xs text-pink-300 dark:text-purple-500">
        &copy; {{ new Date().getFullYear() }} • Built with Vue & Nest.js
      </p>
    </footer>
  </div>
</template>
