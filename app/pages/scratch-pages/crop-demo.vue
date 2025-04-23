<template>
  <UContainer class="my-12">
    <h1>Scratch Page</h1>
    <p>for trying things</p>
    <div>
      <ImageCropper kind="avatar" :src="avatarPic" />
    </div>
    <div>
      <ImageCropper kind="profile" :src="profilePic" />
    </div>
  </UContainer>
</template>

<script setup>
const avatarPic = ref('http://localhost:3031/static/images/adventure/lab-tech-female.jpg')
const profilePic = ref('http://localhost:3031/static/images/adventure/riverside-power-plant.jpg')
</script>

<style scoped></style>
