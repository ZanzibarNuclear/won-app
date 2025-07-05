<template>
  <div class="max-w-none">
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

<style scoped>
.passage-content {
  /* Base typography */
  line-height: 1.6;
}

.passage-content :deep(p) {
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.passage-content :deep(h1) {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  color: #111827;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.passage-content :deep(h2) {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.passage-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #374151;
}

.passage-content :deep(blockquote) {
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  border-left: 4px solid #3b82f6;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  font-style: italic;
  color: #4b5563;
}

.passage-content :deep(blockquote p) {
  margin: 0;
  font-size: 1.125rem;
}

.passage-content :deep(ul) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.passage-content :deep(ul li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.passage-content :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.passage-content :deep(ol li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Nested lists */
.passage-content :deep(ul ul),
.passage-content :deep(ol ol),
.passage-content :deep(ul ol),
.passage-content :deep(ol ul) {
  margin: 0.75rem 0;
  padding-left: 1.25rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .passage-content :deep(h1) {
    font-size: 1.875rem;
    margin-top: 2rem;
  }

  .passage-content :deep(h2) {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }

  .passage-content :deep(h3) {
    font-size: 1.25rem;
    margin-top: 1.25rem;
  }

  .passage-content :deep(blockquote) {
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
  }
}
</style>