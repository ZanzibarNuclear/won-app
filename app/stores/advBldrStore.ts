import { defineStore } from 'pinia'

export const useAdvBldrStore = defineStore('advBldrStore', () => {

  const storyline = ref(null)
  const sceneLookup = ref({})
  const activeSceneId = ref(null)

  const activeScene = computed(() => {
    if (activeSceneId.value) {
      return sceneLookup[activeSceneId.value]
    }
    return null
  })

  return {

  }
})