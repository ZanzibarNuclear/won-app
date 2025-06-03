<template>
  <div>
    <UTooltip text="Click to continue...">
      <UCard variant="subtle">
        <h1 class="text-center my-0 text-cherenkov bg-graphite">{{ messageOfTheDay }}</h1>
      </UCard>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
const messages = ref([
  'Access to energy brings abundance.',
  'All things come from nuclear.',
  'Blue is the new green.',
])

const messageOfTheDay = computed(() => {
  const day = new Date().getDate()
  const indexToday = day % messages.value.length
  return messages.value[indexToday]
})
</script>

<style scoped>
h1 {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
