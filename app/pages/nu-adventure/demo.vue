<template>
  <div>
    <div class="p-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-4">ContextAside Demo</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            This page demonstrates the new ContextAside components with mock data.
          </p>
        </div>

        <!-- Demo Controls -->
        <div class="bg-white dark:bg-cooling-tower rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4">Demo Controls</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UButton @click="loadMockStoryline" color="primary">
              Load Mock Storyline
            </UButton>
            <UButton @click="addRandomItem" color="secondary">
              Add Random Item
            </UButton>
            <UButton @click="earnRandomAchievement" color="success">
              Earn Achievement
            </UButton>
          </div>
        </div>

        <!-- Game State Info -->
        <div class="bg-white dark:bg-cooling-tower rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Current Game State</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium mb-2">Storyline</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ gameState.currentStoryline.value?.title || 'None selected' }}
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">Current Scene</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ gameState.currentScene.value?.title || 'None selected' }}
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">Inventory Items</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ gameState.playerStatus.value.inventory.length }} items
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">Achievements Earned</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{gameState.playerStatus.value.achievements.filter(a => a.earned).length}} / {{
                  gameState.playerStatus.value.achievements.length }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Check the left and right sidebars to see the ContextAside components in action!</p>
          <p class="mt-2">The left sidebar shows the MacroView (adventure progress), and the right sidebar shows the
            DetailView (player stats).</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'adventure',
})

const gameState = useAdventureGameState()

// Mock data for demo
const mockStoryline = {
  _id: 'demo-storyline',
  title: 'Demo Adventure: The Nuclear Quest',
  description: 'A demonstration adventure showcasing the ContextAside components.',
  author: 'Demo Author',
  coverArt: null,
  publishedAt: new Date().toISOString(),
  chapters: [
    {
      _id: 'chapter-1',
      title: 'The Beginning',
      description: 'Where it all starts',
      order: 1,
      openingSceneId: 'scene-1',
      scenes: [
        {
          _id: 'scene-1',
          title: 'Introduction',
          chapterId: 'chapter-1',
          content: []
        },
        {
          _id: 'scene-2',
          title: 'First Challenge',
          chapterId: 'chapter-1',
          content: []
        },
        {
          _id: 'scene-3',
          title: 'Discovery',
          chapterId: 'chapter-1',
          content: []
        }
      ]
    },
    {
      _id: 'chapter-2',
      title: 'The Journey',
      description: 'The adventure continues',
      order: 2,
      openingSceneId: 'scene-4',
      scenes: [
        {
          _id: 'scene-4',
          title: 'New Territory',
          chapterId: 'chapter-2',
          content: []
        },
        {
          _id: 'scene-5',
          title: 'The Test',
          chapterId: 'chapter-2',
          content: []
        }
      ]
    }
  ]
}

const mockScene = {
  _id: 'scene-1',
  title: 'Introduction',
  chapterId: 'chapter-1',
  content: [
    {
      _id: 'content-1',
      type: 'passage',
      label: 'Welcome Text',
      html: 'Welcome to the demo! This scene demonstrates how the ContextAside components work with the game state.'
    }
  ],
  transitions: [
    {
      _id: 'transition-1',
      toSceneId: 'scene-2',
      label: 'Continue',
      prompt: 'Continue to the first challenge'
    }
  ]
}

// Demo methods
function loadMockStoryline() {
  gameState.setStoryline(mockStoryline as any)
  const firstChapter = mockStoryline.chapters[0]
  if (firstChapter) {
    gameState.setChapter(firstChapter as any)
    gameState.setScene(mockScene as any)
  }
}

function addRandomItem() {
  const randomItems = [
    { id: 'demo-compass', name: 'Demo Compass', description: 'Shows the way forward', icon: '🧭' },
    { id: 'demo-map', name: 'Demo Map', description: 'Reveals hidden paths', icon: '🗺️' },
    { id: 'demo-gem', name: 'Demo Gem', description: 'Glows with power', icon: '💎' },
    { id: 'demo-book', name: 'Demo Book', description: 'Contains ancient wisdom', icon: '📚' }
  ]

  const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)]
  if (randomItem) {
    gameState.addToInventory(randomItem)
  }
}

function earnRandomAchievement() {
  const unearnedAchievements = gameState.playerStatus.value.achievements.filter(a => !a.earned)
  if (unearnedAchievements.length > 0) {
    const randomAchievement = unearnedAchievements[Math.floor(Math.random() * unearnedAchievements.length)]
    if (randomAchievement) {
      gameState.earnAchievement(randomAchievement.id)
    }
  }
}
</script>