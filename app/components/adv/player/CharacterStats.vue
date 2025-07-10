<template>
  <div class="bg-white dark:bg-cooling-tower rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Character Stats</h3>
    <div class="space-y-3">
      <!-- Health Bar -->
      <div>
        <div class="flex justify-between text-xs mb-1">
          <span class="text-gray-600 dark:text-gray-400">Health</span>
          <span class="font-medium">{{ gameState.playerStatus.value.stats.health }}/100</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div class="bg-red-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${gameState.playerStatus.value.stats.health}%` }"></div>
        </div>
      </div>

      <!-- Energy Bar -->
      <div>
        <div class="flex justify-between text-xs mb-1">
          <span class="text-gray-600 dark:text-gray-400">Energy</span>
          <span class="font-medium">{{ gameState.playerStatus.value.stats.energy }}/100</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div class="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${gameState.playerStatus.value.stats.energy}%` }"></div>
        </div>
      </div>

      <!-- Experience -->
      <div class="flex justify-between text-xs">
        <span class="text-gray-600 dark:text-gray-400">Experience</span>
        <span class="font-medium">{{ gameState.playerStatus.value.stats.experience }} XP</span>
      </div>

      <!-- Level -->
      <div class="flex justify-between text-xs">
        <span class="text-gray-600 dark:text-gray-400">Level</span>
        <span class="font-medium">{{ gameState.playerStatus.value.stats.level }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()
</script>