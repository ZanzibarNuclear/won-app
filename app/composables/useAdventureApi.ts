import type { AdventureSummary, StorylineSummary, Storyline, Chapter, Scene } from "~/types/adventure-types"

export function useAdventureApi() {
  const api = useWonServiceApi()

  /**
   * Returns a list of adventures
   * @returns 
   */
  const fetchAdventures = async () => {
    const results = await api.get<AdventureSummary[]>('adv/adventures')
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return []
    }
  }

  /**
   * Returns a list of adventures
   * @returns 
   */
  const fetchStorylines = async () => {
    const results = await api.get<StorylineSummary[]>('adv/storylines')
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return []
    }
  }

  /**
   * Returns an adventure with the given ID
   * @returns Storyline, including chapters, if successful; otherwise null
   */
  const fetchStoryline = async (id: string) => {
    const results = await api.get<Storyline>('adv/storylines/' + id)
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return null
    }
  }

  /**
   * Adds a new storyline to the mix
   * @returns Storyline object if successful; otherwise null
   */
  const addStoryline = async (title: string, description: string) => {
    const results = await api.post<Storyline>('adv/storylines', { title, description })
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to add new storyline. (%d)', results.status)
      return null
    }
  }

  /**
   * Submits changes to storyline for safe keeping.
   * @returns Storyline object if successful; otherwise null
   */
  const updateStoryline = async (summary: StorylineSummary) => {
    const results = await api.patch<Storyline>(`adv/storylines/${summary._id}`, summary)
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to update storyline. (%d)', results.status)
      return null
    }
  }

  /**
   * Returns a list of adventures
   * @returns 
   */
  const addChapter = async (storylineId: string, chapterInfo: Chapter) => {
    console.log('api.addChapter', storylineId, chapterInfo)
    const results = await api.post<Chapter>(`adv/storylines/${storylineId}/chapters`, chapterInfo)
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return null
    }
  }

  /**
   * Submits changes to chapter for safe keeping.
   * @returns Storyline object if successful; otherwise null
   */
  const updateChapter = async (storylineId: string, chapterInfo: Chapter) => {
    console.log('api.updateChapter', storylineId, chapterInfo)
    const results = await api.patch<Chapter>(`adv/storylines/${storylineId}/chapters/${chapterInfo._id}`, chapterInfo)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to update storyline. (%d)', results.status)
      return null
    }
  }

  /**
   * Fetch all scenes
   * @returns Array of scenes if successful; otherwise empty array
   */
  const fetchScenes = async (chapterId: string) => {
    const results = await api.get<any[]>('adv/scenes?chapterId=' + chapterId)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to fetch scenes. (%d)', results.status)
      return []
    }
  }

  /**
   * Fetch a single scene
   * @returns Array of scenes if successful; otherwise empty array
   */
  const fetchScene = async (sceneId: string) => {
    const results = await api.get<Scene>('adv/scenes/' + sceneId)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to fetch scenes. (%d)', results.status)
      return null
    }
  }

  /**
   * Fetch content for a specific scene
   * @param sceneId Scene ID
   * @returns Scene content if successful; otherwise null
   */
  const fetchSceneContent = async (sceneId: string) => {
    const results = await api.get<any>(`adv/scenes/${sceneId}/content`)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to fetch scene content. (%d)', results.status)
      return null
    }
  }

  /**
   * Update content for a specific scene
   * @param sceneId Scene ID
   * @param content Content object
   * @returns Updated content if successful; otherwise null
   */
  const updateSceneContent = async (sceneId: string, content: any) => {
    const results = await api.patch<any>(`adv/scenes/${sceneId}/content`, content)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to update scene content. (%d)', results.status)
      return null
    }
  }

  /**
   * Add a new scene
   * @param sceneData Scene object
   * @returns Created scene if successful; otherwise null
   */
  const addScene = async (sceneData: Partial<Scene>) => {
    const results = await api.post<any>('adv/scenes', sceneData)
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to add scene. (%d)', results.status)
      return null
    }
  }



  return {
    fetchAdventures,
    fetchStorylines,
    addStoryline,
    updateStoryline,
    fetchStoryline,
    addChapter,
    updateChapter,
    fetchScenes,
    fetchScene,
    fetchSceneContent,
    updateSceneContent,
    addScene
  }
}