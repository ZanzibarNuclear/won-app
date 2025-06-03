<template>
  <NuxtLink :to="{ name: 'art-gallery' }">
    <InspirationalMessage />
  </NuxtLink>
</template>

<script setup>
definePageMeta({
  layout: 'entryway',
})
</script>

<style lang="scss" scoped></style>
