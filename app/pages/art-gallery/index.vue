<template>
  <div>
    <h1 class="text-center">Flux Gallery</h1>
    <UCarousel
      v-slot="{ item }"
      :items="artwork"
      :autoplay="{ delay: 3000 }"
      class="mx-auto max-w-sm"
    >
      <NuxtPicture :src="item" sizes="100vw sm:50vw md:600px" class="rounded-md" />
    </UCarousel>
    <div class="text-right mt-2">
      <UButton variant="ghost" alt="Go to the guide" :to="{ name: 'won-guide' }">
        Enter here
        <UIcon name="i-ph-arrow-right" />
        <UIcon name="i-ph-door-duotone" />
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'entryway',
})
useSeoMeta({
  title: 'Flux Gallery - World of Nuclear',
  ogTitle: 'Flux Gallery - World of Nuclear',
  description: 'Imagine the beauty of nuclear flux powering the universe',
  ogDescription: 'Imagine the beauty of nuclear flux powering the universe',
  ogImage: 'https://worldofnuclear/images/blue-reactor.jpg',
})
const artwork = [
  '/images/art/flux-hex-sphere.webp',
  '/images/art/flux-radar.webp',
  '/images/art/flux-blossom.webp',
  '/images/art/flux-ocean.webp',
  '/images/art/flux-under-water.webp',
  '/images/art/flux-galaxy.webp',
  '/images/art/flux-spiral.webp',
]
</script>

<style></style>
