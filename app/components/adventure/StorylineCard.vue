<template>
  <UCard class="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <template #header>
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{{ storyline.title }}</h3>
      </div>
    </template>

    <div class="space-y-3">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <UIcon name="i-ph-user" class="w-4 h-4" />
        <span>{{ storyline.author }}</span>
      </div>

      <p v-if="storyline.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
        {{ storyline.description }}
      </p>
      <p v-else class="text-sm text-gray-500 dark:text-gray-500 italic">
        No description available
      </p>

      <div v-if="storyline.createdAt" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
        <UIcon name="i-ph-magic-wand-duotone" class="w-4 h-4" />
        <span>{{ formatDateTime(new Date(storyline.createdAt)) }}</span>
      </div>

      <div v-if="storyline.publishedAt" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
        <UIcon name="i-ph-newspaper-duotone" class="w-4 h-4" />
        <span>Published: {{ formatDateTime(new Date(storyline.publishedAt)) }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton @click.stop="$emit('select', storyline)" icon="i-ph-pencil" size="sm" variant="ghost" color="primary"
          label="Edit" />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { StorylineSummary } from '~/types/adventure-types'

interface Props {
  storyline: StorylineSummary
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [storyline: StorylineSummary]
}>()
</script>