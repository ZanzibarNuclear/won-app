<template>
  <UContainer class="my-32">
    <h1>Scratch Page</h1>
    <p>for trying things</p>
    <ImageCropper :src="profilePic" />
    <!-- <NuxtImg :src="profilePic" width="400" class="my-6" /> -->
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blankpage',
})

const profilePic = ref('http://localhost:3031/static/images/adventure/lab-tech-female.jpg')
</script>

<style scoped></style>
