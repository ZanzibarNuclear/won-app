<template>
  <UContainer>
    <AdvStorylineBuilder :storyline="storyline" />
  </UContainer>
</template>

<script setup lang="ts">
import sample from './sample-storyline.js'

definePageMeta({
  layout: 'adventure-builder',
})

const storyline = ref(sample)
</script>

<style scoped></style>
