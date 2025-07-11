<template>
  <div v-html="block.html" class="passage-content"></div>
</template>

<script setup lang="ts">
import type { PassageBlock } from '~/types/adventure-types'

interface Props {
  block: PassageBlock
}

defineProps<Props>()
</script>