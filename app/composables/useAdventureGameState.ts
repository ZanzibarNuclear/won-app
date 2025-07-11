import type { Storyline, Chapter, Scene } from '~/types/adventure-types'

export const useAdventureGameState = () => {
  // Game state
  const currentStoryline = ref<Storyline | null>(null)
  const currentChapter = ref<Chapter | null>(null)
  const currentScene = ref<Scene | null>(null)
  const sceneHistory = ref<string[]>([])
  const gameProgress = ref<{
    completedChapters: string[]
    currentChapterIndex: number
    currentSceneIndex: number
  }>({
    completedChapters: [],
    currentChapterIndex: 0,
    currentSceneIndex: 0
  })

  // Player state
  const playerStats = ref({
    health: 100,
    energy: 100,
    experience: 0,
    level: 1
  })

  const inventory = ref([
    { id: 'torch', name: 'Torch', description: 'Lights dark areas', icon: '🔥' },
    { id: 'key', name: 'Magic Key', description: 'Opens locked doors', icon: '🔑' },
    { id: 'potion', name: 'Health Potion', description: 'Restores 50 HP', count: 2, icon: '🧪' }
  ])

  const achievements = ref([
    { id: 'first-steps', name: 'First Steps', description: 'Complete your first scene', earned: true },
    { id: 'explorer', name: 'Explorer', description: 'Visit 5 different scenes', earned: true },
    { id: 'collector', name: 'Collector', description: 'Collect 10 items', earned: false, progress: 3 }
  ])

  // Computed properties for sidebar content
  const navigationTree = computed(() => {
    if (!currentStoryline.value) return []

    return currentStoryline.value.chapters.map((chapter, chapterIndex) => ({
      id: chapter._id,
      title: chapter.title,
      completed: gameProgress.value.completedChapters.includes(chapter._id),
      current: currentChapter.value?._id === chapter._id,
      scenes: chapter.scenes.map((scene, sceneIndex) => ({
        id: scene._id,
        title: scene.title,
        completed: sceneHistory.value.includes(scene._id),
        current: currentScene.value?._id === scene._id
      }))
    }))
  })

  const playerStatus = computed(() => ({
    stats: playerStats.value,
    inventory: inventory.value,
    achievements: achievements.value
  }))

  // Methods
  function setStoryline(storyline: Storyline) {
    currentStoryline.value = storyline
    currentChapter.value = null
    currentScene.value = null
    sceneHistory.value = []
    gameProgress.value = {
      completedChapters: [],
      currentChapterIndex: 0,
      currentSceneIndex: 0
    }
  }

  function setChapter(chapter: Chapter) {
    currentChapter.value = chapter
    const chapterIndex = currentStoryline.value?.chapters.findIndex(ch => ch._id === chapter._id) ?? 0
    gameProgress.value.currentChapterIndex = chapterIndex
  }

  function setScene(scene: Scene) {
    if (currentScene.value && currentScene.value._id) {
      sceneHistory.value.push(currentScene.value._id)
    }
    currentScene.value = scene

    // Update progress
    if (currentChapter.value) {
      const sceneIndex = currentChapter.value.scenes.findIndex(s => s._id === scene._id) ?? 0
      gameProgress.value.currentSceneIndex = sceneIndex
    }
  }

  function completeChapter(chapterId: string) {
    if (!gameProgress.value.completedChapters.includes(chapterId)) {
      gameProgress.value.completedChapters.push(chapterId)
    }
  }

  function addToInventory(item: { id: string; name: string; description: string; icon: string; count?: number }) {
    const existingItem = inventory.value.find(i => i.id === item.id)
    if (existingItem && item.count) {
      existingItem.count = (existingItem.count || 1) + item.count
    } else {
      inventory.value.push(item)
    }
  }

  function removeFromInventory(itemId: string, count: number = 1) {
    const itemIndex = inventory.value.findIndex(i => i.id === itemId)
    if (itemIndex !== -1) {
      const item = inventory.value[itemIndex]
      if (item && item.count && item.count > count) {
        item.count -= count
      } else {
        inventory.value.splice(itemIndex, 1)
      }
    }
  }

  function earnAchievement(achievementId: string) {
    const achievement = achievements.value.find(a => a.id === achievementId)
    if (achievement && !achievement.earned) {
      achievement.earned = true
    }
  }

  function updatePlayerStats(stats: Partial<typeof playerStats.value>) {
    Object.assign(playerStats.value, stats)
  }

  function goBack(): string | null {
    if (sceneHistory.value.length > 0) {
      const prevId = sceneHistory.value[sceneHistory.value.length - 1]
      // Remove the current scene from history
      sceneHistory.value = sceneHistory.value.slice(0, -1)
      return prevId || null
    }
    return null
  }

  function reset() {
    currentStoryline.value = null
    currentChapter.value = null
    currentScene.value = null
    sceneHistory.value = []
    gameProgress.value = {
      completedChapters: [],
      currentChapterIndex: 0,
      currentSceneIndex: 0
    }
    playerStats.value = {
      health: 100,
      energy: 100,
      experience: 0,
      level: 1
    }
    inventory.value = [
      { id: 'torch', name: 'Torch', description: 'Lights dark areas', icon: '🔥' },
      { id: 'key', name: 'Magic Key', description: 'Opens locked doors', icon: '🔑' },
      { id: 'potion', name: 'Health Potion', description: 'Restores 50 HP', count: 2, icon: '🧪' }
    ]
    achievements.value = [
      { id: 'first-steps', name: 'First Steps', description: 'Complete your first scene', earned: true },
      { id: 'explorer', name: 'Explorer', description: 'Visit 5 different scenes', earned: true },
      { id: 'collector', name: 'Collector', description: 'Collect 10 items', earned: false, progress: 3 }
    ]
  }

  return {
    // State
    currentStoryline: readonly(currentStoryline),
    currentChapter: readonly(currentChapter),
    currentScene: readonly(currentScene),
    sceneHistory: readonly(sceneHistory),
    gameProgress: readonly(gameProgress),

    // Computed
    navigationTree,
    playerStatus,

    // Methods
    setStoryline,
    setChapter,
    setScene,
    completeChapter,
    addToInventory,
    removeFromInventory,
    earnAchievement,
    updatePlayerStats,
    goBack,
    reset
  }
} 