<template>
  <div class="flex justify-between items-center p-2 rounded-md">
    <!-- Left side - Always visible -->
    <div class="flex items-center">
      <UButton
        variant="ghost"
        icon="ph:plus-square-duotone"
        class="mr-2"
        @click="$emit('new-flux')"
      >
        Start
      </UButton>
    </div>

    <!-- Middle section - Conditional buttons -->
    <!-- React button - Only visible when there is an activeFluxPost -->
    <UButton
      v-if="activeFluxPost"
      variant="ghost"
      icon="ph:sparkle-duotone"
      class="mx-1"
      @click="$emit('react')"
    >
      React
    </UButton>

    <!-- Edit button - Only visible when activeFluxPost.authorId matches userAuthorId -->
    <UButton
      v-if="activeFluxPost && authorId && activeFluxPost.authorId === authorId"
      variant="ghost"
      icon="ph:pencil-simple-duotone"
      class="mx-1"
      @click="$emit('edit')"
    >
      Edit
    </UButton>
    <UButton
      v-if="activeFluxPost && !(authorId && activeFluxPost.authorId === authorId)"
      variant="ghost"
      icon="i-ph-flag-duotone"
      @click="$emit('raise-flag')"
    >
      Flag
    </UButton>

    <!-- Right side - Always visible -->
    <div class="flex items-center">
      <UButton
        variant="ghost"
        icon="ph:clock-clockwise-duotone"
        class="ml-2"
        @click="$emit('see-latest')"
      >
        Latest
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '~/types/won-types'

defineProps({
  activeFluxPost: {
    type: Object as () => Flux | null,
    default: null,
  },
  authorId: {
    type: Number,
    default: null,
  },
})

// Define emits
defineEmits(['new-flux', 'react', 'edit', 'raise-flag', 'see-latest'])
</script>
