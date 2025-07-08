<template>
  <div class="my-4">
    <iframe :src="block.url" class="w-full aspect-video rounded shadow" allowfullscreen />
  </div>
</template>

<script setup lang="ts">
import type { VideoBlock } from '~/types/adventure-types'

interface Props {
  block: VideoBlock
}

defineProps<Props>()
</script>