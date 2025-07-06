<template>
  <div v-if="userStore.isSignedIn">
    <UContainer class="my-12">
      <div v-if="!activeChapter && !activeScene" class="mx-auto text-center mb-2">
        <AdvStorylinePicker :storylines="storylines" @picked-storyline="chooseStoryline" />
      </div>
      <AdvBuilderBreadcrumbTrail :storyline="storyline" :chapter="activeChapter" :scene="activeScene"
        @up-to-storyline="handleUpTo('storyline')" @up-to-chapter="handleUpTo('chapter')" />
      <div v-if="storyline && !activeChapter">
        <AdvStorylineBuilder :storyline="storyline!" @updated="handleStorylineUpdate"
          @build-chapter="handleBuildChapter" />
      </div>
      <div v-if="activeChapter && !activeScene">
        <AdvChapterBuilder :chapter="activeChapter" :is-new="isNewChapter" @update-chapter="handleChapterUpdate"
          @build-scene="handleBuildScene" />
      </div>
      <div v-if="activeChapter && !activeScene">
        <AdvTransitionBuilder :chapter="activeChapter" />
      </div>
      <div v-if="activeScene">
        <AdvSceneBuilder v-if="activeScene" :scene="activeScene" :is-new-scene="isActiveSceneNew"
          @save-scene="handleSaveScene" />
      </div>
    </UContainer>
  </div>
  <div v-else>Please sign in.</div>
</template>

<script setup lang="ts">
import type { Storyline, Chapter, Scene } from '~/types/adventure-types'

const userStore = useUserStore()
const api = useAdventureApi()

const showedInterest = ref(false)

definePageMeta({
  layout: 'adventure-builder',
})

onMounted(() => {
  if (!showedInterest.value) {
    useWonTracking().logInterest('adventure-builder')
    showedInterest.value = true
  }
})

watch(
  () => userStore.user,
  (newUser) => {
    if (newUser === null) {
      console.log('no user')
      return
    }
    console.log('live user', newUser)
    if (newUser && !userStore.isAdmin) {
      navigateTo('/nu-adventure')
    }
  },
  { immediate: true },
)

const storyline: Ref<Storyline | null> = ref(null)
const activeChapter: Ref<Chapter | null> = ref(null)
const isNewChapter = ref(false)
const activeScene: Ref<Scene | null> = ref(null)

const { data: storylines } = useAsyncData('storylines', async () => {
  return await api.fetchStorylines()
})

const isActiveSceneNew = computed(() => {
  return !!activeScene.value && !activeScene.value._id
})

const chooseStoryline = async (id: string) => {
  if (!id) {
    alert('You must pick a storyline to continue.')
    return
  }
  storyline.value = await api.fetchStoryline(id)
}

function handleUpTo(level: 'storyline' | 'chapter') {
  if (level === 'storyline') {
    activeChapter.value = null
    activeScene.value = null
  } else if (level === 'chapter') {
    activeScene.value = null
  }
}

function handleStorylineUpdate(updatedStoryline: Storyline) {
  const currentStoryline = storyline.value
  storyline.value = { ...currentStoryline!, ...updatedStoryline }
  if (currentStoryline?.publishedAt && !updatedStoryline.publishedAt) {
    delete storyline.value!.publishedAt
  }
}

async function handleChapterUpdate(updatedChapter: Chapter) {
  console.log('Updating chapter (builder):', updatedChapter)
  const slId = storyline.value?._id
  let saved: any
  if (isNewChapter.value) {
    console.log('new')
    saved = await api.addChapter(slId!, updatedChapter)
  } else {
    console.log('existing')
    saved = await api.updateChapter(slId!, updatedChapter)
  }

  console.log(saved)
  if (!saved) {
    alert('Failed to save chapter. Please try again.')
    return
  }

  if (isNewChapter.value) {
    storyline.value!.chapters.push(saved)
  } else {
    const index = storyline.value?.chapters.findIndex((ch) => ch._id === saved._id)
    if (index !== undefined && index >= 0) {
      storyline.value!.chapters[index] = saved
    } else {
      storyline.value!.chapters.push(saved)
    }
  }
  activeChapter.value = saved
}

async function loadScenes(chapter: Chapter) {
  const scenes = await api.fetchScenes(chapter._id)
  chapter.scenes = scenes
}

async function handleBuildChapter(chapterId: string | null) {
  activeScene.value = null
  if (!chapterId) {
    isNewChapter.value = true
    activeChapter.value = {
      _id: '',
      title: 'New Chapter',
      description: '',
      order: 0,
      scenes: [],
    }
    return
  } else if (chapterId === '.') {
    activeChapter.value = null
    return
  }

  const chapter = storyline.value?.chapters.find((ch) => ch._id === chapterId)
  if (chapter) {
    activeChapter.value = chapter
    await loadScenes(activeChapter.value!)
    isNewChapter.value = false
  } else {
    activeChapter.value = null
    alert('That is strange. The chapter you picked was not found.')
  }
}

async function handleBuildScene(sceneId: string | null) {
  if (!sceneId) {
    activeScene.value = {
      _id: undefined as unknown as string,
      chapterId: activeChapter.value!._id,
      title: '',
      content: [],
      transitions: [],
    }
    return
  } else if (sceneId === '.') {
    activeScene.value = null
    return
  }

  const scene = activeChapter.value?.scenes.find((s) => s._id === sceneId)
  if (scene) {
    const loaded = await api.fetchScene(scene._id!)
    const idx = activeChapter.value!.scenes.findIndex((s) => s._id === scene._id)
    if (idx !== -1) {
      activeChapter.value!.scenes[idx] = loaded as Scene
    }
    activeScene.value = loaded
  } else {
    alert('That is strange. The scene you picked was not found.')
  }
}

async function handleSaveScene(updatedScene: Scene) {
  if (!activeChapter.value) {
    alert('No active chapter to save scene to.')
    return
  }

  const isNewScene = !updatedScene._id
  let saved: Scene | null
  if (isNewScene) {
    saved = await api.addScene(updatedScene)
  } else {
    saved = await api.updateScene(updatedScene)
  }
  if (!saved) {
    alert('Failed to save scene. Please try again.')
    return
  }

  if (isNewScene) {
    activeChapter.value!.scenes.push(saved)
  } else {
    const idx = activeChapter.value!.scenes.findIndex((s) => s._id === saved._id)
    if (idx !== -1) {
      activeChapter.value!.scenes[idx] = saved
    }
  }
  activeScene.value = saved
}
</script>

<style scoped>
.builder-layout {
  display: flex;
  height: 100vh;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #eee;
  padding: 1rem;
}

.right-panel {
  flex: 1;
  padding: 2rem;
}
</style>
