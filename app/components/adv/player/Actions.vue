<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Actions</h3>
    <div class="space-y-2">
      <button @click="useHealthPotion" :disabled="!hasHealthPotion"
        class="w-full px-3 py-2 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        🧪 Use Health Potion
      </button>
      <button @click="addRandomItem"
        class="w-full px-3 py-2 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors">
        🎁 Add Random Item
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()

// Computed properties
const hasHealthPotion = computed(() => {
  const potion = gameState.playerStatus.value.inventory.find(item => item.id === 'potion')
  return potion && potion.count && potion.count > 0
})

// Methods
function useHealthPotion() {
  if (hasHealthPotion.value) {
    gameState.removeFromInventory('potion', 1)
    gameState.updatePlayerStats({
      health: Math.min(100, gameState.playerStatus.value.stats.health + 50)
    })
  }
}

function addRandomItem() {
  const randomItems = [
    { id: 'compass', name: 'Compass', description: 'Shows direction', icon: '🧭' },
    { id: 'map', name: 'Treasure Map', description: 'Reveals hidden locations', icon: '🗺️' },
    { id: 'gem', name: 'Mystic Gem', description: 'Glows in the dark', icon: '💎' },
    { id: 'book', name: 'Ancient Book', description: 'Contains forgotten knowledge', icon: '📚' }
  ]

  const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)]
  if (randomItem) {
    gameState.addToInventory(randomItem)
  }
}
</script>