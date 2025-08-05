<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  activeApp: 'todow' | 'postow'
}>()
</script>

<template>
  <nav class="border-b border-gray-200">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left Section -->
        <div class="flex items-center space-x-4">
          <a href="#" class="flex items-center font-semibold text-xl text-black">
            <svg class="w-6 h-6 mr-1 text-amber-200-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2L2 7h20L12 2zm0 18l10-5V9L12 14 2 9v6l10 5z" />
            </svg>
            Microw
          </a>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-6 text-sm">
          <RouterLink to="/">
            <a href="#" :class="activeApp === 'todow' ? 'text-sky-500' : 'hover:text-sky-500'"
              >Todow</a
            >
          </RouterLink>
          <RouterLink to="/postow">
            <a href="#" :class="activeApp === 'postow' ? 'text-sky-500' : 'hover:text-sky-500'"
              >Postow</a
            >
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
