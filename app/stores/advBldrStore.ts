import { defineStore } from 'pinia'
import sampleStoryline from './sample-storyline'

export const useAdvBldrStore = defineStore('advBldrStore', () => {

  const storyline = ref(sampleStoryline)

  return {
    storyline
  }
})