<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Quick Actions</h3>
    <div class="space-y-2">
      <UButton @click="goBack" :disabled="gameState.sceneHistory.value.length === 0" size="sm" block label="Go Back" />
      <UButton @click="resetGame" color="warning" size="sm" block label="Reset Game" />
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