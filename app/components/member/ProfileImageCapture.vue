<template>
  <div>
    <div class="space-y-6">
      <input
        type="file"
        accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
      />
      <UButton
        label="Choose Image File"
        color="primary"
        variant="subtle"
        block
        @click="triggerFileInput"
      />
      <ImageCropper
        v-if="isImageLoaded"
        :kind="kind"
        :src="previewUrl"
        @capture-cropped="handleCaptured"
      />
      <UButton
        v-if="isReadyToUpload"
        :disabled="uploading || isUploaded"
        label="Upload Image"
        color="primary"
        variant="subtle"
        block
        @click="handleUpload"
      />
      <UProgress v-if="uploading" v-model="uploadProgress" />
      <div v-if="isUploaded">Upload complete: {{ formatDateTime(uploadTs) }}</div>
      <UButton
        v-if="!(uploading || isUploaded)"
        block
        color="warning"
        variant="outline"
        label="Cancel"
        @click="handleFinish"
      />
      <UButton
        v-if="isUploaded"
        block
        color="success"
        variant="subtle"
        label="Done"
        @click="handleFinish"
      />
    </div>
  </div>
</template>

<script setup>
// kind is a name for the target aspect ratio
// for now, just 'avatar' (1:1) and 'profile' (15:9)
const props = defineProps(['kind', 'startingImage'])
const emit = defineEmits(['finished'])

const fileInput = ref(null)
const previewUrl = ref(null)
const croppedCanvas = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)

const isImageLoaded = computed(() => !!previewUrl.value)
const isReadyToUpload = computed(() => !!croppedCanvas.value)
const isUploaded = ref(false)
const uploadTs = ref(null)

const kinds = {
  avatar: {
    prompt: 'Choose an Avatar',
    apiTarget: 'me/profile/avatar',
  },
  profile: {
    prompt: 'Choose a Profile Picture',
    apiTarget: 'me/profile/glam-shot',
  },
}
const targetPath = computed(() => {
  return kinds[props.kind].apiTarget
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
  isUploaded.value = false
}

const handleCaptured = (canvas) => {
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
      uploadTs.value = Date.now()
      isUploaded.value = true
      // Perhaps you should add the setting appropriate file format here
    }, 'image/jpeg')
  }
}

const handleFinish = () => {
  emit('finished')
}
</script>

<style scoped></style>
