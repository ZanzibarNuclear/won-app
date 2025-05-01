<template>
  <div>
    <UButton @click="loadFluxes">Load Fluxes</UButton>

    <FluxPostCard
      v-for="post in fluxes"
      :key="post.id"
      :post-key="post.id"
      :posted-at="post.postedAt"
      :author="{}"
      :stats="{ boosts: post.boosts, views: post.views, reactions: post.reactions }"
      :post-content="post.content"
    />
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '~/types/won-types'

const fluxService = useFluxService()
const fluxStore = useFluxStore()
const userStore = useUserStore()

const fluxes = ref([] as Flux[])

const loadFluxes = async () => {
  try {
    const fluxBatch = await fluxService.fetchTimeline()
    console.log('fluxBatch', fluxBatch)
  } catch (error) {
    console.error('Error fetching fluxes:', error)
  }
}
</script>

<style scoped></style>
