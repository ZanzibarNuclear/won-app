<!-- components/ProfileImageUpload.vue -->
<template>
  <div>
    <UCard class="max-w-sm">
      <div class="flex flex-col items-center space-y-4">
        <!-- Preview or current image -->
        <UAvatar
          :src="previewUrl || userProfileImage"
          size="xl"
          alt="Profile image"
          class="w-32 h-32"
        />
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
const fileInput = ref(null)
const previewUrl = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)
const userProfileImage = ref(
  'https://cdn.worldofnuclear.com/static/images/adventure/lab-tech-female.jpg',
) // Replace with actual user image URL from your app

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
  const validTypes = ['image/jpeg', 'image/png']
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (!validTypes.includes(file.type)) {
    alert('Please upload a JPEG or PNG image')
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
    const response = await $fetch(
      `${useRuntimeConfig().public.wonServiceUrl}/api/me/profile/avatar`,
      {
        method: 'POST',
        body: formData,
        onUploadProgress: (event) => {
          uploadProgress.value = Math.round((event.loaded / event.total) * 100)
        },
      },
    )
    userProfileImage.value = response.url // Update with the returned image URL
    previewUrl.value = null
  } catch (error) {
    alert('Upload failed: ' + error.message)
  } finally {
    uploading.value = false
    uploadProgress.value = 0
  }
}
</script>
