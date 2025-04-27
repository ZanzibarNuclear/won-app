<template>
  <div class="">
    <div class="flex flex-col-3">
      <div class="flex-1/4">
        <span class="font-bold">{{ name }}:</span>
      </div>
      <div class="flex-5/8 align-top">
        {{ value }}
      </div>
      <div class="flex-1/8">
        <slot />
      </div>
    </div>
    <div v-if="explanation" class="text-sm mt-2 italic">{{ explanation }}</div>
    <USeparator color="neutral" class="mt-4 w-11/12" />
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
