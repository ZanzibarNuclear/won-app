<template>
  <div>
    <h2>Choose an Image</h2>
    <div class="space-y-6">
      <input
        type="file"
        accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
      />
      <URadioGroup v-model="kind" :items="imageKinds" />
      <UButtonGroup orientation="horizontal">
        <UButton
          color="neutral"
          variant="subtle"
          @click="triggerFileInput"
          label="Choose Image File"
        />
        <UButton
          color="neutral"
          variant="outline"
          label="Upload"
          :disabled="!previewUrl"
          @click="handleUpload"
        />
      </UButtonGroup>
      <ImageCropper
        v-if="previewUrl"
        :kind="kind"
        :src="previewUrl"
        @capture-cropped="handleCaptured"
      />
      <UProgress v-if="uploading" :value="uploadProgress" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['currentImage', 'kind'])

const fileInput = ref(null)
const previewUrl = ref(null)
const croppedCanvas = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)

// const kind = ref('avatar')
const imageKinds = [
  {
    label: 'Avatar',
    value: 'avatar',
  },
  {
    label: 'Profile',
    value: 'profile',
  },
]
const kinds = {
  avatar: {
    apiTarget: 'me/profile/avatar',
  },
  profile: {
    apiTarget: 'me/profile/glam-shot',
  },
}
const targetPath = computed(() => {
  return kinds[kind.value].apiTarget
})

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  } else {
    console.error('File input ref is not available')
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Client-side validation
  const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (!validTypes.includes(file.type)) {
    alert('Support image types include: jpeg (jpg), png, svg, gif, webp')
    return
  }
  if (file.size > maxSize) {
    alert('Image must be smaller than 5MB')
    return
  }

  // Generate preview
  previewUrl.value = URL.createObjectURL(file)
}

const handleCaptured = (canvas) => {
  console.log('hey, I got this canvas from the cropper: ', canvas)
  croppedCanvas.value = canvas
}

const handleUpload = async () => {
  if (croppedCanvas.value) {
    const formData = new FormData()
    croppedCanvas.value.toBlob(async (blob) => {
      formData.append('file', blob)
      const response = await useWonServiceApi().postImage(
        targetPath.value,
        formData,
        uploadProgress,
      )
      useUserStore().setProfile(response.data)
      // Perhaps you should add the setting appropriate file format here
    }, 'image/jpeg')
  }
}
</script>

<style scoped></style>
