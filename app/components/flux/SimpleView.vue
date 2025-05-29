<template>
  <div class="border border-cherenkov p-4">
    <MemberNameTag
      :handle="flux.author.handle"
      :alias="flux.author.alias"
      :avatar-src="flux.author.avatar"
      class="mb-4"
    />
    <div>
      <span v-html="flux.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '~/types/won-types'

defineProps<{
  flux: Flux
}>()
</script>

<style scoped></style>
