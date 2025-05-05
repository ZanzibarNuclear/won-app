<template>
  <UContainer class="xs:w-7/8 sm:w-7/8 md:w-4/5 w-min-[80px]">
    <h1>Flux</h1>
    <div v-if="userStore.isFluxUserLoaded">
      <FluxComposer />
    </div>
    <div v-else>Want to participate? <NuxtLink to="/flux-app/join">Join Flux</NuxtLink>.</div>
    <FluxPostCard
      v-for="post in fluxStore.timeline"
      :key="post.id"
      :post="post"
      :is-flux-user="userStore.isFluxUserLoaded"
    />
  </UContainer>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const fluxStore = useFluxStore()
const fluxService = useFluxService()

await fluxService.fetchTimeline(true)
</script>

<style scoped></style>
