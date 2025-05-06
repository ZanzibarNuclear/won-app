<template>
  <UContainer class="xs:w-7/8 sm:w-7/8 md:w-4/5 w-min-[80px]">
    <h1>Flux</h1>
    <div>
      <div v-if="userStore.isFluxUserLoaded">
        <FluxComposer :reacting-to="fluxStore.activeFlux" />
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
      <div v-else>
        <FluxPostCard
          v-for="post in fluxStore.timeline"
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

const handleView = async (item: Flux) => {
  await useFluxService().registerView(item.id)
  fluxStore.setActiveFlux(item)
}

const handleReaction = async (item: Flux) => {
  await useFluxService().registerView(item.id)
  fluxStore.setActiveFlux(item, true)
}

const handleBoost = async (item: Flux) => {
  await useFluxService().boostFlux(item.id)
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
