<template>
  <figure class="my-4">
    <img :src="block.imageSrc" :alt="block.label" class="rounded shadow" />
    <figcaption v-if="block.caption" class="text-xs text-gray-500 mt-2">
      {{ block.caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { ImageBlock } from '~/types/adventure-types'

interface Props {
  block: ImageBlock
}

defineProps<Props>()
</script>