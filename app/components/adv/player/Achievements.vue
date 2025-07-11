<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Achievements</h3>
    <div class="space-y-2">
      <div v-for="achievement in gameState.playerStatus.value.achievements" :key="achievement.id"
        class="flex items-center justify-between p-2 rounded-md" :class="{
          'bg-green-50 dark:bg-green-900/10': achievement.earned,
          'bg-gray-50 dark:bg-gray-800': !achievement.earned
        }">
        <div class="flex items-center">
          <span class="text-sm mr-2"
            :class="achievement.earned ? 'text-green-600 dark:text-green-400' : 'text-gray-400'">
            {{ achievement.earned ? '✓' : '○' }}
          </span>
          <div>
            <div class="text-xs font-medium"
              :class="achievement.earned ? 'text-green-700 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'">
              {{ achievement.name }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ achievement.description }}
            </div>
          </div>
        </div>
        <span v-if="achievement.progress" class="text-xs text-gray-500 dark:text-gray-400">
          {{ achievement.progress }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()
</script>