<template>
  <div>
    <h2>{{ kind === 'avatar' ? 'Avatar' : kind === 'profile' ? 'Profile' : 'Image' }} Cropper</h2>
  </div>
  <cropper
    v-if="kind === 'avatar'"
    class="avatar-cropper"
    :stencil-component="CircleStencil"
    :stencil-props="{
      aspectRatio: 1 / 1,
    }"
    :src="src"
  />
  <cropper
    v-if="kind === 'profile'"
    class="profile-cropper"
    :stencil-component="RectangleStencil"
    :stencil-props="{
      aspectRatio: 16 / 9,
    }"
    :src="src"
  />
</template>

<script setup>
import { CircleStencil, Cropper, RectangleStencil } from 'vue-advanced-cropper'

defineProps(['src', 'kind'])

function change({ coordinates, canvas }) {
  console.log(coordinates, canvas)
}
</script>

<style scoped>
.avatar-cropper {
  height: 300px;
  width: 300px;
  background: #444;
}
.profile-cropper {
  height: 288px;
  width: 512px;
  background: #444;
}
</style>
