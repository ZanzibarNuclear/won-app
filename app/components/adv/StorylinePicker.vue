<template>
  <div>
    <UButton @click="emit('pickedStoryline')"> Pick Storyline </UButton>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['pickedStoryline'])

function pickStoryline() {
  emit('pickedStoryline')
}
</script>

<style scoped></style>
