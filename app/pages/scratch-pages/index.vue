<template>
  <UPage>
    <UPageHeader title="Scratch Pages" description="for trying things" />
    <UPageAside>
      <UNavigationMenu orientation="vertical" :items="items" />
    </UPageAside>
  </UPage>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Cropping Demo',
      to: '/scratch-pages/crop-demo',
    },
    {
      label: 'Image Upload',
      to: '/scratch-pages/upload',
    },
  ],
])
</script>

<style scoped></style>
