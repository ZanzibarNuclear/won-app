<template>
  <div class="max-w-none prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert prose-cherenkov ">
    <div v-html="block.html" class="passage-content"></div>
  </div>
</template>

<script setup lang="ts">
import type { PassageBlock } from '~/types/adventure-types'

interface Props {
  block: PassageBlock
}

defineProps<Props>()
</script>