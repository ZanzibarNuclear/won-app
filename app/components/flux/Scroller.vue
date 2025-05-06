<template>
  <ContinuousScroller
    :has-more="currentContext.hasMore"
    :loading-in-progress="loading"
    @load-more="loadMoreFluxes"
  >
    <template #items>
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
    </template>
  </ContinuousScroller>
</template>

<script lang="ts" setup>
import type { Flux } from '~/types/won-types'

const emit = defineEmits(['viewFlux', 'reactToFlux', 'boostFlux', 'viewAuthorProfile'])

const fluxStore = useFluxStore()
const userStore = useUserStore()

const { fetchTimeline, fetchReactions, currentContext, loading } = useFluxService()

const fluxHistory = computed(() => {
  return !!fluxStore.activeFlux ? fluxStore.reactions : fluxStore.timeline
})

onMounted(async () => {
  if (!!fluxStore.activeFlux) {
    await fetchReactions(fluxStore.activeFlux.id, true)
  } else {
    await fetchTimeline(true)
  }
})

const loadMoreFluxes = async () => {
  if (!!fluxStore.activeFlux) {
    await fetchReactions(fluxStore.activeFlux.id)
  } else {
    await fetchTimeline()
  }
}

const handleView = async (flux: Flux) => {
  emit('viewFlux', flux)
}

const handleReaction = async (flux: Flux) => {
  emit('reactToFlux', flux)
}

const handleBoost = async (flux: Flux) => {
  emit('boostFlux', flux)
}

const handleViewProfile = async (handle: string) => {
  emit('viewAuthorProfile', handle)
}
</script>
