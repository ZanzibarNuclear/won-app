<template>
  <UBreadcrumb :items="items" class="text-cooling-tower dark:text-cooling-tower-dark">

  </UBreadcrumb>
</template>

<script lang="ts" setup>
const items = [
  {
    label: 'Nu Adventure',
    to: '/nu-adventure',
  },
  {
    label: 'Play',
    to: '/nu-adventure/player',
  },
  {
    label: 'Feedback',
    to: '/nu-adventure/feedback',
  },
]
</script>

<style></style>