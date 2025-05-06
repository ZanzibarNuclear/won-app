<template>
  <UContainer class="xs:w-7/8 sm:w-7/8 md:w-4/5 w-min-[80px]">
    <h1>Flux</h1>
    <div>
      <div>
        <div class="flex justify-between">
          <UButton
            v-if="userStore.isFluxUserLoaded"
            label="Share your thoughts"
            icon="i-ph-pencil-duotone"
            @click="showComposer = true"
          />
          <div v-else>Want to participate? <UButton to="/flux-app/join">Join Flux</UButton>.</div>
          <UButton
            label="See the latest"
            icon="i-ph-clock-clockwise-duotone"
            @click="handleResetTimeline"
          />
        </div>
        <UModal v-model:open="showComposer">
          <template #content>
            <FluxComposer :reacting-to="fluxStore.activeFlux" @close="showComposer = false" />
          </template>
        </UModal>
      </div>
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
        <USeparator label="Reactions" />
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

const showComposer = ref(false)

await fluxService.fetchTimeline(true)

const fluxHistory = computed(() => {
  return !!fluxStore.activeFlux ? fluxStore.reactions : fluxStore.timeline
})

const handleView = async (item: Flux) => {
  await fluxService.registerView(item.id)
  fluxStore.setActiveFlux(item)
  fluxService.fetchReactions(item.id, true)
}

const handleReaction = async (item: Flux) => {
  await fluxService.registerView(item.id)
  await fluxService.fetchReactions(item.id, true)
  fluxStore.setActiveFlux(item, true)
  showComposer.value = true
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

const handleResetTimeline = () => {
  fluxStore.clearActiveFlux()
  fluxService.fetchTimeline(true)
}
</script>

<style scoped></style>
