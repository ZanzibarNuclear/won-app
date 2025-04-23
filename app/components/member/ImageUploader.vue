<template>
  <div>
    <UCard class="max-w-sm">
      <div class="flex flex-col items-center space-y-4">
        <!-- Preview or current image -->
        <UAvatar
          v-if="kind === 'avatar'"
          :src="previewUrl || userProfileImage"
          size="xl"
          alt="Profile image"
          class="w-32 h-32"
        />
        <NuxtImg v-else :src="previewUrl || userProfileImage" class="w-full" />
        <!-- File input -->
        <input
          type="file"
          accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
          ref="fileInput"
          class="hidden"
          @change="handleFileChange"
        />
        <div class="flex flex-row space-x-2">
          <UButton color="primary" variant="solid" @click="triggerFileInput" label="Choose Image" />
          <UButton
            :disabled="!previewUrl"
            color="primary"
            variant="solid"
            :loading="uploading"
            @click="handleUpload"
            label="Upload"
          />
          <UButton color="warning" variant="solid" @click="handleRemoval" label="Remove Image" />
        </div>
        <!-- Progress indicator -->
        <UProgress v-if="uploading" :value="uploadProgress" />
      </div>
    </UCard>
  </div>
</template>

<script setup>
const kinds = {
  avatar: {
    apiTarget: 'me/profile/avatar',
  },
  profile: {
    apiTarget: 'me/profile/glam-shot',
  },
}

const props = defineProps({
  initialSrc: {
    type: String,
  },
  kind: {
    type: String,
    validator: (value) => ['avatar', 'profile'].includes(value),
    default: 'avatar',
  },
})

const wonService = useWonServiceApi()

const emit = defineEmits(['finished'])
const userProfileImage = ref(props.initialSrc)
const fileInput = ref(null)
const previewUrl = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)

const targetPath = computed(() => {
  return kinds[props.kind].apiTarget
})

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

const handleUpload = async () => {
  const file = fileInput.value.files[0]
  if (!file) return

  uploading.value = true
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await wonService.postImage(targetPath.value, formData, uploadProgress)
    useUserStore().setProfile(response.data)
  } catch (error) {
    alert('Upload failed: ' + error.message)
  } finally {
    uploading.value = false
    uploadProgress.value = 0
    emit('finished')
  }
}

const handleRemoval = async () => {
  try {
    const response = await wonService.delete(targetPath.value)
  } catch (error) {
    alert('Removal failed: ' + error.message)
  } finally {
    emit('finished')
  }
}
</script>
