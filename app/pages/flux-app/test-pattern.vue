<template>
  <div>
    <UButton @click="loadFluxes">Load Fluxes</UButton>

    <FluxPostCard
      v-for="post in fluxes"
      :key="post.id"
      post-key="byteme-123"
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

const fluxes = ref([] as Flux[])

const loadFluxes = async () => {
  try {
    const fluxBatch = await fluxService.fetchTimeline()
    fluxBatch.forEach(async (flux) => {
      fluxes.value.push(flux)
      if (fluxStore.lookupFluxAuthor(flux.authorId) === null) {
        const author = await fluxService.fetchFluxAuthorById(flux.authorId)
      }
      flux.author = author
    })
  } catch (error) {
    console.error('Error fetching fluxes:', error)
  }
}
</script>

<style scoped></style>
