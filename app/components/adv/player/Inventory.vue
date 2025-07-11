<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Inventory</h3>
    <div class="space-y-3">
      <div v-for="item in gameState.playerStatus.value.inventory" :key="item.id"
        class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
        <span class="text-lg mr-3">{{ item.icon }}</span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {{ item.name }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ item.description }}
          </div>
        </div>
        <span v-if="item.count && item.count > 1"
          class="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium">
          {{ item.count }}
        </span>
      </div>
      <div v-if="gameState.playerStatus.value.inventory.length === 0"
        class="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
        Inventory is empty
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()
</script>