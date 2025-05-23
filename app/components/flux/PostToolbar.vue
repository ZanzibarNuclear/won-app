<template>
  <div class="flux-post-toolbar">
    <!-- Left side - Always visible -->
    <div class="toolbar-left">
      <button class="toolbar-button new-flux-button" @click="$emit('new-flux')">
        Start a new flux
      </button>
    </div>

    <!-- Middle section - Conditional buttons -->
    <div class="toolbar-middle">
      <!-- React button - Only visible when there is an activeFluxPost -->
      <button v-if="activeFluxPost" class="toolbar-button react-button" @click="$emit('react')">
        React
      </button>

      <!-- Edit button - Only visible when activeFluxPost.authorId matches userAuthorId -->
      <button
        v-if="activeFluxPost && userAuthorId && activeFluxPost.authorId === userAuthorId"
        class="toolbar-button edit-button"
        @click="$emit('edit')"
      >
        Edit
      </button>
    </div>

    <!-- Right side - Always visible -->
    <div class="toolbar-right">
      <button class="toolbar-button latest-button" @click="$emit('see-latest')">
        See the latest
      </button>
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

<style scoped>
.flux-post-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.toolbar-left,
.toolbar-middle,
.toolbar-right {
  display: flex;
  align-items: center;
}

.toolbar-button {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.toolbar-button:hover {
  background-color: #2980b9;
}

.new-flux-button {
  background-color: #2ecc71;
}

.new-flux-button:hover {
  background-color: #27ae60;
}

.edit-button {
  background-color: #f39c12;
}

.edit-button:hover {
  background-color: #e67e22;
}
</style>
