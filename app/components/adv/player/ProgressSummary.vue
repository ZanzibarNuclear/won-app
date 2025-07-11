<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Progress Summary</h3>
    <div class="space-y-2 text-xs">
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">Chapters Completed:</span>
        <span class="font-medium">{{ gameState.gameProgress.value.completedChapters.length }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">Scenes Visited:</span>
        <span class="font-medium">{{ gameState.sceneHistory.value.length }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">Current Chapter:</span>
        <span class="font-medium">{{ gameState.gameProgress.value.currentChapterIndex + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()
</script>