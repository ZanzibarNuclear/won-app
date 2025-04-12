<template>
  <div class="shadow-xl rounded-lg overflow-hidden mx-auto p-4 mt-6 mb-12">
    <NuxtImg class="mx-auto" :src="fullSrc" :alt="caption" :width="width" :height="height" />
    <div v-if="credit" class="text-center mt-2 text-sm">
      Photo by:
      <NuxtLink v-if="creditUrl" :to="creditUrl">{{ credit }}</NuxtLink>
      <span v-else>{{ credit }}</span>
    </div>
    <div v-if="caption" class="mt-6 text-center text-lg">
      {{ caption }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string
  alt?: string
  width?: string
  height?: string
  caption?: string
  credit?: string
  creditUrl?: string
}>()

const { cdnEndpoint } = useRuntimeConfig().public

const fullSrc = computed(() => {
  return cdnEndpoint + '/images/' + props.src
})
</script>

<style scoped></style>
