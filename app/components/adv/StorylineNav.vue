<template>
  <div>
    <h2>Storyline</h2>
    <UButton
      @click="$emit('add-chapter')"
      icon="i-ph-plus-square-duotone"
      size="xs"
      variant="subtle"
    />
    Add Chapter
    <ul>
      <li v-for="chapter in chapters" :key="chapter._id" class="my-2">
        <div
          :class="{ selected: selected?.id === chapter._id && selected?.type === 'chapter' }"
          @click="$emit('select', { ...chapter, type: 'chapter' })"
        >
          {{ chapter.title }}
        </div>
        <UButton
          @click.stop="$emit('add-scene', chapter._id)"
          icon="i-ph-plus-square-duotone"
          size="xs"
          variant="subtle"
          class="mt-2"
        />
        Add Scene
        <ul>
          <li
            v-for="scene in chapter.scenes"
            class="my-1"
            :key="scene._id"
            :class="{ selected: selected?.id === scene._id && selected?.type === 'scene' }"
            @click="$emit('select', { ...scene, chapterId: chapter._id, type: 'scene' })"
          >
            {{ scene.title }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from '~/types/adventure-types'

defineProps<{
  chapters: Array<Chapter>
  selected: any
}>()
</script>

<style scoped>
.selected {
  font-weight: bold;
  color: #1976d2;
}
ul {
  list-style: none;
  padding-left: 1em;
}
</style>
