<template>
  <UCard>
    <template #header>
      <div class="text-2xl font-bold">Flag Details</div>
    </template>
    <template #footer>
      <UButton label="Close" variant="subtle" color="secondary" @click="emit('close')" />
    </template>
    <div class="mb-4"><strong>Reporter:</strong> {{ activeFlag.reporter.handle }}</div>
    <div class="mb-4">
      <strong>Flux ID:</strong><UButton label="Show Flux" @click="emit('viewFlux')" />
    </div>
    <div class="mb-4">
      <strong>Reasons:</strong>
      <ul>
        <li v-for="reason in activeFlag.reasons" :key="reason">{{ reason }}</li>
      </ul>
    </div>
    <div class="mb-4">
      <strong>Reported At:</strong> {{ formatDateTime(new Date(activeFlag.createdAt)) }}
    </div>
    <div class="mb-4">
      <strong>Message:</strong> {{ activeFlag.message || 'No message provided.' }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Flag } from '~/types/won-types'

defineProps<{
  activeFlag: Flag
}>()
const emit = defineEmits(['viewFlux', 'close'])
</script>

<style scoped></style>
