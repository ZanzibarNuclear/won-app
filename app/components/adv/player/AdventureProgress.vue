<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Adventure Progress</h3>

    <!-- Current Storyline -->
    <div v-if="gameState.currentStoryline.value" class="mb-4">
      <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Storyline</div>
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ gameState.currentStoryline.value.title }}
      </div>
    </div>

    <!-- Navigation Tree -->
    <nav class="space-y-3">
      <template v-if="gameState.navigationTree.value.length > 0">
        <div v-for="chapter in gameState.navigationTree.value" :key="chapter.id" class="space-y-2">
          <!-- Chapter Header -->
          <div class="flex items-center justify-between">
            <div class="text-xs font-medium" :class="{
              'text-green-600 dark:text-green-400': chapter.completed,
              'text-blue-600 dark:text-blue-400': chapter.current,
              'text-gray-500 dark:text-gray-400': !chapter.completed && !chapter.current
            }">
              Chapter {{ chapter.id }}: {{ chapter.title }}
            </div>
            <span v-if="chapter.completed" class="text-green-600 dark:text-green-400">✓</span>
          </div>

          <!-- Chapter Scenes -->
          <div class="ml-3 space-y-1">
            <div v-for="scene in chapter.scenes" :key="scene.id"
              class="block px-3 py-2 text-xs rounded-md cursor-pointer transition-colors" :class="{
                'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300': scene.completed,
                'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300': scene.current,
                'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800': !scene.completed && !scene.current
              }">
              Scene {{ scene.id }}: {{ scene.title }}
            </div>
          </div>
        </div>
      </template>
      <div v-else class="text-sm text-gray-500 dark:text-gray-400">
        Select a storyline to begin
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()
</script>