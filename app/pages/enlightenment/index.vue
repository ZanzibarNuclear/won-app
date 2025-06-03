<template>
  <NuxtLink :to="{ name: 'art-gallery' }">
    <InspirationalOpener />
  </NuxtLink>
</template>

<script setup>
definePageMeta({
  layout: 'entryway',
})
</script>

<style lang="scss" scoped></style>
