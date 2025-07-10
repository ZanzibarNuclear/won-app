<template>
  <div class="bg-white dark:bg-cooling-tower rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Quick Actions</h3>
    <div class="space-y-2">
      <button @click="goBack" :disabled="gameState.sceneHistory.value.length === 0"
        class="w-full px-3 py-2 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        ← Go Back
      </button>
      <button @click="resetGame"
        class="w-full px-3 py-2 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
        Reset Game
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()

function goBack() {
  const prevSceneId = gameState.goBack()
  if (prevSceneId) {
    // In a real implementation, you'd navigate to the previous scene
    console.log('Going back to scene:', prevSceneId)
  }
}

function resetGame() {
  if (confirm('Are you sure you want to reset the game? This will clear all progress.')) {
    gameState.reset()
  }
}
</script>