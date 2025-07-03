<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Set up transitions between scenes</h3>
    <div>Transitions give users a choice in how the adventure goes.</div>
    <div v-if="isNeeded">
      <div>
        Choose a scene to transition from: <USelect :items="sceneItems" v-model="fromSceneId" />
      </div>
      <div>
        <h4>Transitions:</h4>
        <UCard v-for="transition in fromScene?.transitions" @click="handleEdit(transition)">
          <templete #header>transition.label</templete>
          <div>Transition ID: {{ transition._id }}</div>
          <div>To scene: {{ transition.toSceneId }}</div>
          <div>Prompt: {{ transition.prompt }}</div>
        </UCard>
      </div>

      <UButton
        @click="handleAdd"
        icon="i-ph-plus-square-duotone"
        size="sm"
        variant="subtle"
        label="Add Transition"
      />
      <AdvTransitionForm
        :from-scene-id="fromSceneId"
        :scene-items="sceneItems"
        :transition="transitionToEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chapter, Scene, Transition } from '~/types/adventure-types'

const props = defineProps<{
  chapter: Chapter | null
}>()

const fromSceneId = ref('.')
const fromScene = computed(() => {
  return props.chapter?.scenes.find((scene) => scene._id === fromSceneId.value) || null
})

const sceneItems = computed(() => {
  return (
    props.chapter?.scenes.map((scene) => ({
      value: scene._id!,
      label: scene.title,
    })) || []
  )
})
const isNeeded = computed(() => {
  return sceneItems.value.length > 1
})

const transitionToEdit = ref<Transition | null>(null)
const isEdit = ref(false)

async function handleAdd() {
  isEdit.value = true
}
async function handleEdit(transition: Transition) {
  if (transition) {
    transitionToEdit.value = transition
  }
  isEdit.value = true
}
</script>

<style scoped></style>
