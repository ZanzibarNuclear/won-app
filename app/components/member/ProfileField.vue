<template>
  <div class="my-8">
    <div class="flex">
      <div class="mr-6">
        <span class="font-bold">{{ name }}:</span>
      </div>
      <div class="flex-grow">
        {{ value }}
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div v-if="explanation" class="text-sm mt-2 italic">{{ explanation }}</div>
    <USeparator color="neutral" class="my-6" />
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
