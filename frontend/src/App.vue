<script setup>
import ProfileHeader from './components/ProfileHeader.vue'
import AboutMeSection from './components/AboutMeSection.vue'
import GallerySection from './components/GallerySection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactForm from './components/ContactForm.vue'
import GuestbookSection from './components/GuestbookSection.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <!-- Navbar -->
    <nav
      class="sticky top-0 z-50 border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-lg"
    >
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span class="text-lg font-bold tracking-tight">
          <span class="text-indigo-400">eunice</span>.dev
        </span>
        <div class="hidden gap-6 text-sm font-medium text-gray-400 sm:flex">
          <a href="#about" class="transition hover:text-white">About</a>
          <a href="#gallery" class="transition hover:text-white">Gallery</a>
          <a href="#skills" class="transition hover:text-white">Skills</a>
          <a href="#projects" class="transition hover:text-white">Projects</a>
          <a href="#guestbook" class="transition hover:text-white">Guestbook</a>
          <a href="#contact" class="transition hover:text-white">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="mx-auto max-w-5xl space-y-20 px-6 py-16">
      <ProfileHeader />

      <div id="about">
        <AboutMeSection />
      </div>

      <div id="gallery">
        <GallerySection />
      </div>

      <div id="skills">
        <SkillsSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="guestbook">
        <GuestbookSection />
      </div>

      <div id="contact">
        <ContactForm />
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800/60 py-8 text-center text-sm text-gray-500">
      &copy; {{ new Date().getFullYear() }} Eunice Nipas. Built with Vue &amp; Nest.js.
    </footer>
  </div>
</template>
