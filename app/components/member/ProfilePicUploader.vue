<!-- components/ProfileImageUpload.vue -->
<template>
  <div>
    <UCard class="max-w-sm">
      <div class="flex flex-col items-center space-y-4">
        <!-- Preview or current image -->
        <NuxtImg
          :src="previewUrl || userProfileImage"
          size="xl"
          alt="Profile image"
          class="w-200"
        />
        <!-- File input -->
        <input
          type="file"
          accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
          ref="fileInput"
          class="hidden"
          @change="handleFileChange"
        />
        <!-- Trigger button -->
        <UButton color="primary" variant="solid" @click="triggerFileInput"> Choose Image </UButton>
        <!-- Upload button -->
        <UButton
          v-if="previewUrl"
          color="green"
          variant="solid"
          :loading="uploading"
          @click="uploadImage"
        >
          Upload
        </UButton>
        <!-- Progress indicator -->
        <UProgress v-if="uploading" :value="uploadProgress" />
      </div>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps({
  glamShotUrl: {
    type: String,
  },
})
const userProfileImage = ref(props.glamShotUrl)
const fileInput = ref(null)
const previewUrl = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)

// Function to trigger file input click
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

const uploadImage = async () => {
  const file = fileInput.value.files[0]
  if (!file) return

  uploading.value = true
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await useWonServiceApi().postImage(
      'me/profile/glam-shot',
      formData,
      uploadProgress,
    )
    console.log(JSON.stringify(response))
  } catch (error) {
    alert('Upload failed: ' + error.message)
  } finally {
    uploading.value = false
    uploadProgress.value = 0
  }
}
</script>
