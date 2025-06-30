<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <AdvStorylineForm
      v-if="isEdit"
      :storyline="storyline"
      :is-new="false"
      @submit="handleUpdateStoryline"
      @cancel="isEdit = false"
    />
    <div v-else>
      <div class="flex items-center mb-4">
        <div class="min-w-[200px]">
          <NuxtImg v-if="storyline.coverArt" :src="storyline.coverArt" width="250" />
          <NuxtImg v-else src="/images/nuclear-vibes.jpg" width="250" />
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
      <div class="space-x-1">
        <AdvChapterPicker
          v-if="storyline.chapters"
          :chapters="storyline.chapters"
          @chosen="handleSelectChapter"
          class="my-4"
        />
        <UButton
          @click="handleAddChapter"
          icon="i-ph-plus-square-duotone"
          size="sm"
          variant="subtle"
          label="Add Chapter"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Storyline } from '~/types/adventure-types'
defineProps<{
  storyline: Storyline
}>()
const emit = defineEmits(['updated', 'build-chapter'])

const api = useAdventureApi()

const isEdit = ref(false)

async function handleUpdateStoryline(updatedStoryline: Storyline) {
  const updated = await api.updateStoryline(updatedStoryline)
  emit('updated', updated)
  isEdit.value = false
}

function handleAddChapter() {
  emit('build-chapter', null)
}

function handleSelectChapter(chapterId: string) {
  emit('build-chapter', chapterId)
}
</script>
