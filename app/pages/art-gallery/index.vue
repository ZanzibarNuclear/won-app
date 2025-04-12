<template>
  <div>
    <UCarousel
      v-slot="{ item }"
      :items="artwork"
      :autoplay="{ delay: 3000 }"
      class="mx-auto w-full"
    >
      <img :src="item" class="rounded-xl" />
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
  ogImage: 'https://cdn.worldofnuclear.com/static/images/art/flux-blossom.webp',
})
const { cdnEndpoint } = useRuntimeConfig().public
const images = [
  'flux-hex-sphere.webp',
  'flux-radar.webp',
  'flux-blossom.webp',
  'flux-ocean.webp',
  'flux-under-water.webp',
  'flux-galaxy.webp',
  'flux-spiral.webp',
]
const artwork = computed(() => {
  return images.map((image) => `${cdnEndpoint}/images/art/${image}`)
})
</script>

<style></style>
