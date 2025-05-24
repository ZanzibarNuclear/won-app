import { defineStore } from 'pinia'
import type { Flux, FluxAuthor } from '~/types/won-types'

export const useFluxStore = defineStore('fluxStore', () => {

  // State

  // FIXME: cache fluxes in map and have timeline, activeFlux use IDs; reference in computed properties
  // problem is that activeFlux is being handed a copy; fine, but use the ID to reference the cached value
  // so that updates are reflected on the page

  const timeline = ref<Flux[]>([])  // shows relevant fluxes for user
  const activeFlux = ref<Flux | null>(null)
  const isReaction = ref(false)
  const reactions = ref<Flux[]>([]) // shows replies to activeFlux
  const fluxAuthors = ref<Record<number, FluxAuthor>>({}) // stores flux authors for quick access

  function cacheFluxAuthor(author: FluxAuthor) {
    fluxAuthors.value[author.id] = author
  }

  function lookupFluxAuthor(id: number): FluxAuthor | null {
    if (fluxAuthors.value[id]) {
      return fluxAuthors.value[id]
    }
    return null
  }

  const timelineEmpty = computed(() => !timeline.value || timeline.value.length === 0)

  function setTimeline(fluxes: Flux[]) {
    timeline.value = fluxes
  }

  function addToTimeline(flux: Flux) {
    timeline.value.unshift(flux)
  }

  function appendToTimeline(fluxes: Flux[]) {
    if (fluxes && fluxes.length > 0) {
      timeline.value.push(...fluxes)
    }
  }

  function clearTimeline() {
    timeline.value = []
  }

  function setActiveFlux(flux: Flux, reaction: boolean = false) {
    if (flux === activeFlux.value) {
      if (reaction) {
        isReaction.value = true
      }
      return
    }
    activeFlux.value = flux
    reactions.value = []
    isReaction.value = reaction
  }

  function cancelReaction() {
    isReaction.value = false
  }

  function clearActiveFlux() {
    activeFlux.value = null
    isReaction.value = false
  }

  function updateFlux(flux: Flux) {
    let index = timeline.value.findIndex(item => item.id === flux.id)
    if (index !== -1) {
      timeline.value[index] = flux
    }
    index = reactions.value.findIndex(item => item.id === flux.id)
    if (index !== -1) {
      reactions.value[index] = flux
    }
    if (activeFlux.value && activeFlux.value.id === flux.id) {
      activeFlux.value = flux
    }
  }

  function setReactions(fluxes: Flux[]) {
    reactions.value = fluxes
  }

  function addReaction(flux: Flux) {
    reactions.value.unshift(flux)
  }

  function appendToReactions(fluxes: Flux[]) {
    if (fluxes && fluxes.length > 0) {
      reactions.value.push(...fluxes)
    }
  }

  function clearReactions() {
    reactions.value = []
  }

  return {
    cacheFluxAuthor,
    lookupFluxAuthor,
    timeline,
    setTimeline,
    timelineEmpty,
    addToTimeline,
    appendToTimeline,
    clearTimeline,
    setActiveFlux,
    activeFlux,
    isReaction,
    cancelReaction,
    clearActiveFlux,
    updateFlux,
    reactions,
    setReactions,
    addReaction,
    appendToReactions,
    clearReactions,
  }
})
