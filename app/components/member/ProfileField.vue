<template>
  <div class="">
    <div class="flex flex-col-2">
      <div class="flex-1/4">
        <span class="font-bold">{{ name }}:</span>
      </div>
      <div class="flex-3/4">
        {{ value }}
      </div>
    </div>
    <div v-if="explanation" class="text-sm mt-2 italic">{{ explanation }}</div>
    <USeparator color="primary" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String },
  value: { type: String },
  explanation: { type: String },
})
</script>

<style scoped></style>
