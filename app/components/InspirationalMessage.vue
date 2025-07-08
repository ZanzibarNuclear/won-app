<template>
  <div>
    <UTooltip text="Click to continue...">
      <UCard variant="subtle">
        <div v-if="inspiration" class="text-center">
          <h1 v-if="inspiration.content" class="text-lg text-cherenkov bg-graphite">
            {{ inspiration.content }}
          </h1>
          <div v-if="inspiration.mediaUrl" class="mt-4">
            <img v-if="isImage(inspiration.mediaUrl)" :src="inspiration.mediaUrl"
              :alt="inspiration.title || 'Inspiration'" class="max-w-full h-auto rounded-lg mx-auto" />
            <video v-else-if="isVideo(inspiration.mediaUrl)" :src="inspiration.mediaUrl" controls
              class="max-w-full h-auto rounded-lg mx-auto" />
          </div>
        </div>
        <!-- <div v-else class="text-center">
          <h1 class="text-center my-0 text-cherenkov bg-graphite">{{ fallbackMessage }}</h1>
        </div> -->
      </UCard>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import type { Inspiration } from '~/types/won-types'

const publicAccess = usePublicAccess()

const inspiration = ref<Inspiration | null>(null)
const fallbackMessage = ref('Blue is the new green.')

const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
}

const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg)$/i.test(url)
}

const loadInspiration = async () => {
  try {
    const result = await publicAccess.getRandomInspiration()
    if (result) {
      inspiration.value = result
    }
  } catch (error) {
    console.error('Failed to load inspiration:', error)
  }
}

onMounted(() => {
  loadInspiration()
})
</script>

<style scoped>
h1 {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
