<template>
  <UContainer class="xs:w-7/8 sm:w-7/8 md:w-4/5 w-min-[80px]">
    <h1>Flux</h1>
    <div>
      <div v-if="userStore.isFluxUserLoaded">
        <FluxComposer v-if="fluxStore.isReaction" :reacting-to="fluxStore.activeFlux" />
        <FluxComposer v-else />
      </div>
      <div v-else>Want to participate? <NuxtLink to="/flux-app/join">Join Flux</NuxtLink>.</div>
    </div>
    <div>
      <div v-if="fluxStore.activeFlux">
        <FluxPostCard
          :key="fluxStore.activeFlux.id"
          :post="fluxStore.activeFlux"
          :is-flux-user="userStore.isFluxUserLoaded"
          @view-flux="handleView"
          @react-to-flux="handleReaction"
          @boost-flux="handleBoost"
          @view-author-profile="handleViewProfile"
        />
      </div>
      <div>
        <FluxPostCard
          v-for="post in fluxHistory"
          :key="post.id"
          :post="post"
          :is-flux-user="userStore.isFluxUserLoaded"
          @view-flux="handleView"
          @react-to-flux="handleReaction"
          @boost-flux="handleBoost"
          @view-author-profile="handleViewProfile"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { Flux } from '~/types/won-types'

const userStore = useUserStore()
const fluxStore = useFluxStore()
const fluxService = useFluxService()

await fluxService.fetchTimeline(true)

const fluxHistory = computed(() => {
  return fluxStore.isReaction ? fluxStore.reactions : fluxStore.timeline
})

const handleView = async (item: Flux) => {
  await fluxService.registerView(item.id)
  fluxStore.setActiveFlux(item)
}

const handleReaction = async (item: Flux) => {
  await fluxService.registerView(item.id)
  await fluxService.fetchReactions(item.id, true)
  fluxStore.setActiveFlux(item, true)
}

const handleBoost = async (item: Flux) => {
  await fluxService.boostFlux(item.id)
}

const handleViewProfile = (handle: string) => {
  if (!handle) {
    console.warn('No handle? No profile.')
    return
  }
  navigateTo(`/profiles-in-nuclear/${handle}`)
}
</script>

<style scoped></style>
