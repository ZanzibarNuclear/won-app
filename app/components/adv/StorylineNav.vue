<template>
  <div>
    <h2>Storyline</h2>
    <button @click="$emit('add-chapter')">+ Add Chapter</button>
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <div
          :class="{ selected: selected?.id === chapter.id && selected?.type === 'chapter' }"
          @click="$emit('select', { ...chapter, type: 'chapter' })"
        >
          {{ chapter.title }}
        </div>
        <button @click.stop="$emit('add-scene', chapter.id)">+ Add Scene</button>
        <ul>
          <li
            v-for="scene in chapter.scenes"
            :key="scene.id"
            :class="{ selected: selected?.id === scene.id && selected?.type === 'scene' }"
            @click="$emit('select', { ...scene, chapterId: chapter.id, type: 'scene' })"
          >
            {{ scene.title }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  chapters: Array<any>
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
