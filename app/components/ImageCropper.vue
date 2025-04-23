<template>
  <div>
    <h2>{{ kind === 'avatar' ? 'Avatar' : kind === 'profile' ? 'Profile' : 'Image' }} Cropper</h2>
  </div>
  <cropper
    :class="isAvatar ? 'avatar-cropper' : 'profile-cropper'"
    :stencil-component="stencilComponent"
    :stencil-props="stencilProps"
    :src="src"
    @change="onChange"
  />
</template>

<script setup>
import { CircleStencil, Cropper, RectangleStencil } from 'vue-advanced-cropper'

const props = defineProps(['src', 'kind'])

const config = {
  avatar: {
    component: CircleStencil,
    stencilProps: { aspectRatio: 1 / 1 },
    dimensions: {
      height: '300px',
      width: '300px',
    },
  },
  profile: {
    component: RectangleStencil,
    stencilProps: { aspectRatio: 16 / 9 },
    dimensions: {
      height: '288px',
      width: '512px',
    },
  },
}

const coord = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
})
const croppedImg = ref(null)
const isAvatar = computed(() => {
  return props.kind === 'avatar'
})
const isProfile = computed(() => {
  return props.kind === 'profile'
})
const stencilProps = computed(() => {
  return config[props.kind].stencilProps
})
const stencilComponent = computed(() => {
  return config[props.kind].component
})

function onChange({ coordinates, canvas }) {
  coord.value = coordinates
  croppedImg.value = canvas.toDataURL()
  console.log(props.kind, coord.value, canvas)
}
</script>

<style scoped>
.avatar-cropper {
  height: 250px;
  width: 250px;
  background: #444;
}
.profile-cropper {
  height: 288px;
  width: 512px;
  background: #444;
}
</style>
