<template>
  <div>
    <h1 class="text-center">Flux Gallery</h1>
    <UCarousel
      v-slot="{ item }"
      :items="artwork"
      :auto-height="true"
      :autoplay="{ delay: 3000 }"
      class="mx-auto max-w-sm"
    >
      <NuxtPicture
        :src="`/images/art/${item}`"
        sizes="100vw sm:50vw md:600px"
        @click="advanceSlide()"
      />
    </UCarousel>
    <div class="text-right mt-2">
      <UButton
        variant="ghost"
        alt="Go to the guide"
        :to="{ name: 'won-guide' }"
      >
        Enter here
        <UIcon name="i-ph-arrow-right" />
        <UIcon name="i-ph-door-duotone" />
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "entryway",
});
useSeoMeta({
  title: "Flux Gallery - World of Nuclear",
  ogTitle: "Flux Gallery - World of Nuclear",
  description: "Imagine the beauty of nuclear flux powering the universe",
  ogDescription: "Imagine the beauty of nuclear flux powering the universe",
  ogImage: "https://worldofnuclear/images/blue-reactor.jpg",
});
const artwork = [
  "flux-hex-sphere.webp",
  "flux-radar.webp",
  "flux-blossom.webp",
  "flux-ocean.webp",
  "flux-under-water.webp",
  "flux-galaxy.webp",
  "flux-spiral.webp",
];
const showing = ref(0);

const advanceSlide = () => {
  showing.value = (showing.value + 1) % artwork.length;
};
</script>

<style></style>
