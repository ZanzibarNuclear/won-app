import { defineStore } from 'pinia'
import type { Flux, FluxProfile } from '~/types/won-types'

export const useFluxStore = defineStore('fluxStore', () => {
  // State
  const profile = ref<FluxProfile | null>(null)
  const timeline = ref<Flux[]>([])  // shows relevant fluxes for user
  const activeFlux = ref<Flux | null>(null)
  const isReply = ref(false)
  const reactions = ref<Flux[]>([]) // shows replies to activeFlux

  const hasProfile = computed(() => !!profile.value)

  function setProfile(myProfile: FluxProfile) {
    profile.value = myProfile
  }

  function clearProfile() {
    profile.value = null
  }

  function setActiveFlux(flux: Flux, reply: boolean = false) {
    if (flux === activeFlux.value) {
      if (reply) {
        isReply.value = true
      }
      return
    }
    activeFlux.value = flux
    reactions.value = []
    isReply.value = reply
  }

  function cancelReply() {
    isReply.value = false
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
  }

  function clearActiveFlux() {
    activeFlux.value = null
    isReply.value = false
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

  function setReactions(fluxes: Flux[]) {
    reactions.value = fluxes
  }

  function appendToReactions(fluxes: Flux[]) {
    if (fluxes && fluxes.length > 0) {
      reactions.value.push(...fluxes)
    }
  }

  function addReply(flux: Flux) {
    reactions.value.unshift(flux)
  }

  function clearReactions() {
    reactions.value = []
  }

  return {
    profile,
    setProfile,
    clearProfile,
    hasProfile,
    timeline,
    setTimeline,
    appendToTimeline,
    clearTimeline,
    activeFlux,
    isReply,
    cancelReply,
    setActiveFlux,
    updateFlux,
    timelineEmpty,
    addToTimeline,
    clearActiveFlux,
    reactions,
    setReactions,
    appendToReactions,
    addReply,
    clearReactions,
  }
})
