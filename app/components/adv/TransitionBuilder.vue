<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Transitions</h3>
    <div>Transitions give users a choice in how the adventure goes.</div>
    <div v-if="!isNeeded">Once you have 2 or more scenes, this will come alive.</div>
    <div v-if="isNeeded">
      <div>
        Choose a scene to transition from: <USelect :items="sceneItems" v-model="fromSceneId" />
      </div>
      <div>
        <h4>Transitions:</h4>
        <div v-if="!isEdit">
          <UButton
            @click="handleAdd"
            icon="i-ph-plus-square-duotone"
            size="sm"
            variant="subtle"
            label="Add Transition"
          />
          <div class="flex flex-wrap gap-2">
            <UCard
              v-for="transition in fromScene?.transitions"
              :key="transition._id"
              class="my-4 md:w-80 xs:w-full"
              @click="handleEdit(transition)"
            >
              <template #header>{{ transition.label }} (ID: {{ transition._id }})</template>
              <div class="space-y-1">
                <div>To scene: {{ transition.toSceneId }}</div>
                <div>Prompt: {{ transition.prompt }}</div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
      <AdvTransitionForm
        v-if="isEdit"
        :from-scene-id="fromSceneId"
        :scene-items="sceneItems"
        :transition="transitionToEdit"
        @cancel="handleCancel"
        @submit="handleSave"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chapter, Transition } from '~/types/adventure-types'

const props = defineProps<{
  chapter: Chapter | null
}>()

const fromSceneId = ref('.')
const fromScene = computed(() => {
  return props.chapter?.scenes.find((scene) => scene._id === fromSceneId.value) || null
})

watch(fromSceneId, async (newId) => {
  if (newId === '.' || !props.chapter) return
  const scene = props.chapter.scenes.find((s) => s._id === newId)
  if (scene && !scene.transitions) {
    const api = useAdventureApi()
    const fullScene = await api.fetchScene(newId)
    if (fullScene && fullScene.transitions) {
      Object.assign(scene, fullScene)
    }
  }
})

const sceneItems = computed(() => {
  const options =
    props.chapter?.scenes.map((scene) => ({
      value: scene._id!,
      label: scene.title,
    })) || []
  const items = [{ value: '.', label: '--Choose a scene--' }, ...options]
  return items
})
const isNeeded = computed(() => {
  return sceneItems.value.length > 1
})
const isNewTransition = computed(() => {
  return !transitionToEdit.value
})

const transitionToEdit = ref<Transition | null>(null)
const isEdit = ref(false)

function handleAdd() {
  isEdit.value = true
}
function handleEdit(transition: Transition) {
  if (transition) {
    transitionToEdit.value = transition
  }
  isEdit.value = true
}
function handleCancel() {
  isEdit.value = false
}
async function handleSave(transition: Transition) {
  const api = useAdventureApi()
  let saved: Transition | null
  if (isNewTransition.value) {
    saved = await api.addTransition(fromSceneId.value, transition)
  } else {
    saved = await api.updateTransition(fromSceneId.value, transition)
  }
  if (!saved) {
    alert('Failed to save transition')
    return
  }

  if (isNewTransition.value) {
    fromScene.value?.transitions?.push(saved)
  } else {
    const idx = fromScene.value?.transitions?.findIndex((b: any) => b._id === transition._id)
    if (idx && idx !== -1) {
      fromScene.value!.transitions![idx] = saved
    }
  }
  isEdit.value = false
}
</script>

<style scoped></style>
