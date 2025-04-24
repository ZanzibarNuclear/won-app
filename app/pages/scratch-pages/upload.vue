<template>
  <UContainer class="my-12">
    <h2>Upload</h2>

    <div class="space-y-6">
      <input
        type="file"
        accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
      />
      <UButton color="primary" variant="solid" @click="triggerFileInput" label="Choose Image" />

      <NuxtImg v-if="previewUrl" :src="previewUrl" class="w-1/2" />
    </div>
  </UContainer>
</template>

<script setup>
const fileInput = ref(null)
const previewUrl = ref(null)
// const uploading = ref(false)
// const uploadProgress = ref(0)

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
  console.log(previewUrl.value)
}
</script>

<style scoped></style>
