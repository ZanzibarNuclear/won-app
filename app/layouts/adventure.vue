<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <NavAdvPlayerHeader />

    <!-- Main content area with sidebars -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar -->
      <aside class="w-64 dark:bg-cooling-tower border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <slot name="left-sidebar">
          <!-- Dynamic left sidebar content -->
          <div class="p-4">
            <h3 class="text-sm font-semibold mb-3">Adventure Progress</h3>
            <nav class="space-y-1">
              <div v-if="gameState.currentStoryline.value" class="text-xs mb-2">{{
                gameState.currentStoryline.value.title }}</div>
              <template v-if="gameState.navigationTree.value.length > 0">
                <div v-for="chapter in gameState.navigationTree.value" :key="chapter.id" class="mb-3">
                  <div class="text-xs mb-2" :class="{
                    'text-green-600': chapter.completed,
                    'text-blue-600': chapter.current,
                    'text-gray-500': !chapter.completed && !chapter.current
                  }">
                    Chapter {{ chapter.id }}: {{ chapter.title }}
                    <span v-if="chapter.completed" class="ml-1">✓</span>
                  </div>
                  <div v-for="scene in chapter.scenes" :key="scene.id"
                    class="block px-3 py-2 text-sm rounded-md cursor-pointer transition-colors" :class="{
                      'bg-green-100 text-green-700': scene.completed,
                      'bg-blue-100 text-blue-700': scene.current,
                      'text-gray-500 hover:bg-gray-100': !scene.completed && !scene.current
                    }">
                    Scene {{ scene.id }}: {{ scene.title }}
                  </div>
                </div>
              </template>
              <div v-else class="text-sm text-gray-500">Select a storyline to begin</div>
            </nav>
          </div>
        </slot>
      </aside>

      <!-- Central Content Area -->
      <main class="flex-1 overflow-y-auto bg-white dark:bg-graphite">
        <slot />
      </main>

      <!-- Right Sidebar -->
      <aside
        class="w-64 bg-gray-50 dark:bg-cooling-tower border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
        <slot name="right-sidebar">
          <!-- Dynamic right sidebar content -->
          <div class="p-4">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Player Status</h3>
            <div class="space-y-4">
              <!-- Character Stats -->
              <div class="bg-white dark:bg-cooling-tower rounded border p-3">
                <h4 class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Character</h4>
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Health:</span>
                    <span class="font-medium">{{ gameState.playerStatus.value.stats.health }}/100</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Energy:</span>
                    <span class="font-medium">{{ gameState.playerStatus.value.stats.energy }}/100</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Experience:</span>
                    <span class="font-medium">{{ gameState.playerStatus.value.stats.experience }}</span>
                  </div>
                </div>
              </div>

              <!-- Inventory -->
              <div class="bg-white dark:bg-cooling-tower rounded border p-3">
                <h4 class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Inventory</h4>
                <div class="space-y-2">
                  <div v-for="item in gameState.playerStatus.value.inventory" :key="item.id" class="flex items-center">
                    <span class="text-lg mr-2">{{ item.icon }}</span>
                    <div class="flex-1">
                      <div class="text-sm font-medium">{{ item.name }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.description }}</div>
                    </div>
                    <span v-if="item.count && item.count > 1" class="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">
                      {{ item.count }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Achievements -->
              <div class="bg-white dark:bg-cooling-tower rounded border p-3">
                <h4 class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Achievements</h4>
                <div class="space-y-1">
                  <div v-for="achievement in gameState.playerStatus.value.achievements" :key="achievement.id"
                    class="text-xs" :class="achievement.earned ? 'text-green-600' : 'text-gray-400'">
                    {{ achievement.earned ? '✓' : '○' }} {{ achievement.name }}
                    <span v-if="achievement.progress" class="text-gray-500">({{ achievement.progress }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import the game state composable
const gameState = useAdventureGameState()
</script>
