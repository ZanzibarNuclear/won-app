<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Scene Transitions</h3>
    <div v-if="!isNeeded">Once you have 2 or more scenes, this will come alive.</div>
    <div v-if="isNeeded">
      <div>
        Transition from:
        <AdvScenePicker v-if="chapter?.scenes" :scenes="chapter.scenes" v-model="fromSceneId" />
        <UButton v-if="fromSceneId !== '.' && !isEdit" @click="handleAdd" icon="i-ph-plus-square-duotone" size="sm"
          variant="subtle" label="Add Transition" />
      </div>
      <div v-if="!isEdit">
        <div class="flex flex-wrap gap-2">
          <div v-for="transition in fromScene?.transitions" :key="transition._id"
            class="ml-8 my-4 pl-8 flex flex-col space-y-2 border-l border-cherenkov">
            <div class="space-y-1">
              <div>{{ transition.label }}</div>
              <div><strong>To scene:</strong> {{ transition.toSceneId }}</div>
              <div><strong>Prompt:</strong> {{ transition.prompt }}</div>
            </div>
            <div class="flex space-x-2">
              <UButton @click="handleEdit(transition)" icon="i-ph-pencil-duotone" size="sm" variant="subtle"
                label="Edit" />
              <UButton @click="handleDelete(transition)" icon="i-ph-trash-duotone" size="sm" variant="subtle"
                label="Delete" color="warning" />
            </div>
          </div>
        </div>
      </div>
      <AdvTransitionForm v-if="isEdit" :from-scene-id="fromSceneId" :scenes="chapter?.scenes || []"
        :transition="transitionToEdit" @cancel="handleCancel" @submit="handleSave" />
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

const isNeeded = computed(() => {
  return props.chapter?.scenes && props.chapter.scenes.length > 1
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
async function handleDelete(transition: Transition) {
  const api = useAdventureApi()
  const results = await api.deleteTransition(fromSceneId.value, transition._id!)
  if (results) {
    fromScene.value!.transitions = fromScene.value!.transitions!.filter((t: any) => t._id !== transition._id)
  }
}
</script>

<style scoped></style>
