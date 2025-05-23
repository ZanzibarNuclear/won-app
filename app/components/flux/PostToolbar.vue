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
        New flux
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
      v-if="activeFluxPost && userAuthorId && activeFluxPost.authorId === userAuthorId"
      variant="ghost"
      icon="ph:pencil-simple-duotone"
      class="mx-1"
      @click="$emit('edit')"
    >
      Edit
    </UButton>

    <!-- Right side - Always visible -->
    <div class="flex items-center">
      <UButton
        variant="ghost"
        icon="ph:clock-clockwise-duotone"
        class="ml-2"
        @click="$emit('see-latest')"
      >
        Show latest
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define props
interface FluxPost {
  id: string
  authorId: string
  // Add other properties as needed
}

defineProps({
  activeFluxPost: {
    type: Object as () => FluxPost | null,
    default: null,
  },
  userAuthorId: {
    type: String,
    default: null,
  },
})

// Define emits
defineEmits(['new-flux', 'react', 'edit', 'see-latest'])
</script>
