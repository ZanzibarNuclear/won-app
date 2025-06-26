<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Storyline Builder</h3>
    <AdvStorylineForm
      v-if="isEdit"
      :storyline="storyline"
      :is-new="false"
      @submit="handleUpdateStoryline"
      @cancel="isEdit = false"
    />
    <div v-else class="flex items-center mb-4">
      <div class="min-w-[200px]">
        <NuxtImg v-if="storyline.coverArt" :src="storyline.coverArt" width="250" />
      </div>
      <div class="flex-1 px-4">
        <div>
          <h3>Storyline: {{ storyline?.title }}</h3>
          <div>{{ storyline?.description }}</div>
        </div>
        <div class="mt-4">
          <UButton @click="isEdit = true" icon="i-ph-pencil-duotone"> Edit Storyline </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdventureStoryline } from '~/types/adventure-types'
defineProps<{
  storyline: AdventureStoryline
}>()
const emit = defineEmits(['updated'])

const isEdit = ref(false)

function handleUpdateStoryline(updatedStoryline: AdventureStoryline) {
  emit('updated', updatedStoryline)
  isEdit.value = false
}
</script>
