<script setup lang="ts">
const tracking = useWonTracking()
const showInterest = () => {
  useWonTracking().logInterest('adventure')
  navigateTo('https://hero.worldofnuclear.com', { external: true })
}
</script>

<template>
  <UPage>
    <UPageHero
      title="Save the World"
      description="Can you save humanity? Play this exciting role-playing, simulation game, and see how you do."
    >
      <NuxtImg :src="cdnImage('/adventure/flowing-river-home.jpg')" class="mx-auto" width="600px" />
      <UButton @click="showInterest" label="Tell Me More" block />
    </UPageHero>
  </UPage>
</template>

<style scoped></style>
