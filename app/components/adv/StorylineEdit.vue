<template>
  <div class="mx-auto w-3/4">
    <AdvStorylineForm
      v-if="isEdit"
      :storyline="storyline"
      :is-new="false"
      @submit="handleUpdateStoryline"
      @cancel="$emit('cancel-edit')"
    />
    <div v-else>
      <NuxtImg v-if="storyline.coverArt" :src="storyline.coverArt" width="250" />
      <h3>{{ storyline?.title }}</h3>
      <div>{{ storyline?.description }}</div>
      <UButton @click="$emit('edit')" class="mt-4"> Edit Storyline </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdventureStoryline } from '~/types/adventure-types'
const props = defineProps<{
  storyline: AdventureStoryline
  isEdit: boolean
}>()

function handleUpdateStoryline(updatedStoryline: AdventureStoryline) {
  emit('updated', updatedStoryline)
}
const emit = defineEmits(['edit', 'cancel-edit', 'updated'])
</script>
