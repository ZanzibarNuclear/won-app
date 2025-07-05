<template>
  <PassageView v-if="block.type === 'passage'" :block="block" />
  <ImageView v-else-if="block.type === 'image'" :block="block" />
  <VideoView v-else-if="block.type === 'video'" :block="block" />
  <PassageView v-else :block="block" />
</template>

<script setup lang="ts">
import type { ContentBlock } from '~/types/adventure-types'
import PassageView from './PassageView.vue'
import ImageView from './ImageView.vue'
import VideoView from './VideoView.vue'

interface Props {
  block: ContentBlock
}

defineProps<Props>()
</script>