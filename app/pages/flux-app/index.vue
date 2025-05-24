<template>
  <UContainer class="xs:w-7/8 sm:w-7/8 md:w-4/5 w-min-[80px]">
    <h1>Flux</h1>
    <div>
      <div>
        <FluxPostToolbar
          :active-flux-post="fluxStore.activeFlux"
          :user-author-id="userStore.fluxAuthor?.id"
          @new-flux="handleNewFlux"
          @see-latest="handleLoadLatest"
          @react="handleReactToActive"
          @edit="handleEditActive"
        />
        <UModal v-model:open="showComposer">
          <template #content>
            <FluxComposer
              :reacting-to="reactingTo"
              :for-edit="fluxToEdit"
              @close="handleComposerClose"
            />
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
      <div class="mt-6 mb-12">
        <FluxScroller
          :key="refreshKey"
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

const fluxToEdit = ref(null)
const reactingTo = ref(null)

const showComposer = ref(false)
const refreshKey = ref(1)

const handleLoadLatest = () => {
  fluxStore.clearActiveFlux()
  refreshKey.value++
}

const handleView = async (item: Flux) => {
  await fluxService.registerView(item.id)
  fluxStore.setActiveFlux(item)
  fluxService.fetchReactions(item.id, true)
}

const handleNewFlux = async () => {
  fluxToEdit.value = null
  reactingTo.value = null
  showComposer.value = true
}

const handleEditActive = async () => {
  fluxToEdit.value = fluxStore.activeFlux
  reactingTo.value = null
  showComposer.value = true
}

const handleReactToActive = async () => {
  fluxToEdit.value = null
  reactingTo.value = fluxStore.activeFlux
  showComposer.value = true
}

const handleReaction = async (item: Flux) => {
  await fluxService.registerView(item.id)
  await fluxService.fetchReactions(item.id, true)
  fluxStore.setActiveFlux(item, true)
  reactingTo.value = item.id
  showComposer.value = true
}

const handleComposerClose = async () => {
  showComposer.value = false
  if (!fluxToEdit.value && !reactingTo.value) {
    handleLoadLatest()
  }
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
