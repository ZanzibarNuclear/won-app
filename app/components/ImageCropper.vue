<template>
  <div>
    <h2>{{ kind === 'avatar' ? 'Avatar' : kind === 'profile' ? 'Profile' : 'Image' }} Cropper</h2>
  </div>
  <div>
    <div class="my-6">
      <cropper
        ref="croppy"
        :class="isAvatar ? 'avatar-cropper' : 'profile-cropper'"
        :stencil-component="stencilComponent"
        :stencil-props="stencilProps"
        :src="src"
        :debounce="false"
        @change="onChange"
      />
    </div>
    <div>
      <preview
        v-if="isAvatar"
        :width="80"
        :height="80"
        :image="result.image"
        :coordinates="result.coordinates"
      />
      <preview
        v-if="isProfile"
        :width="256"
        :height="144"
        :image="result.image"
        :coordinates="result.coordinates"
      />
    </div>
    <div>
      <UButton label="Capture Now" @click="onCapture" />
    </div>
  </div>
</template>

<script setup>
import { CircleStencil, Cropper, Preview, RectangleStencil } from 'vue-advanced-cropper'

const props = defineProps(['src', 'kind'])
const emit = defineEmits(['capture-cropped'])

const croppy = ref(null)

onMounted(() => {
  console.log(croppy.value)
})

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
const result = ref({
  coordinates: null,
  image: null,
})

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

function onChange({ coordinates, image }) {
  result.value = {
    coordinates,
    image,
  }
}

function onCapture() {
  const { canvas } = croppy.value.getResult()
  if (canvas) {
    console.log('found cropper canvas')
    emit('capture-cropped', canvas)
  }
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
