<template>
  <UContainer class="my-12">
    <h1>Scratch Page</h1>
    <p>for trying things</p>
    <div class="grid grid-cols-2 gap-x-6">
      <div>
        <ImageCropper kind="avatar" :src="avatarPic" />
      </div>
      <div>
        <h2>Original Image</h2>
        <NuxtImg :src="avatarPic" width="300" class="my-6" />
      </div>
      <div>
        <ImageCropper kind="profile" :src="profilePic" />
      </div>
      <div>
        <h2>Original Image</h2>
        <NuxtImg :src="profilePic" width="300" class="my-6" />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const avatarPic = ref('http://localhost:3031/static/images/adventure/lab-tech-female.jpg')
const profilePic = ref('http://localhost:3031/static/images/adventure/riverside-power-plant.jpg')
</script>

<style scoped></style>
