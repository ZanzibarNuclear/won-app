import type { AdventureSummary, StorylineSummary, Storyline, Chapter, Scene, ContentBlock, Transition } from "~/types/adventure-types"

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
   * Publish a storyline by setting the publishedAt field
   * @param storylineId Storyline ID
   * @returns Updated storyline if successful; otherwise null
   */
  const publishStoryline = async (storylineId: string) => {
    const results = await api.patch<Storyline>(`adv/storylines/${storylineId}/publish`)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to publish storyline. (%d)', results.status)
      return null
    }
  }

  /**
   * Unpublish a storyline by clearing the publishedAt field
   * @param storylineId Storyline ID
   * @returns Updated storyline if successful; otherwise null
   */
  const unpublishStoryline = async (storylineId: string) => {
    const results = await api.patch<Storyline>(`adv/storylines/${storylineId}/unpublish`)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to unpublish storyline. (%d)', results.status)
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
   * Fetch a chapter by storylineId and chapterId
   * @param storylineId Storyline ID
   * @param chapterId Chapter ID
   * @returns Chapter object if successful; otherwise null
   */
  const fetchChapter = async (storylineId: string, chapterId: string) => {
    const results = await api.get<Chapter>(`adv/storylines/${storylineId}/chapters/${chapterId}`)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to fetch chapter. (%d)', results.status)
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
    const results = await api.get<Scene[]>('adv/scenes?chapterId=' + chapterId)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to fetch scenes. (%d)', results.status)
      return []
    }
  }

  /**
   * Add a new scene
   * @param sceneData Scene object
   * @returns Created scene if successful; otherwise null
   */
  const addScene = async (sceneData: Partial<Scene>) => {
    const results = await api.post<Scene>('adv/scenes', sceneData)
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to add scene. (%d)', results.status)
      return null
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
   * Add a new scene
   * @param sceneData Scene object
   * @returns Created scene if successful; otherwise null
   */
  const updateScene = async (sceneData: Partial<Scene>) => {
    const results = await api.patch<Scene>('adv/scenes/' + sceneData._id, sceneData)
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to add scene. (%d)', results.status)
      return null
    }
  }

  /**
   * Fetch content for a specific scene
   * @param sceneId Scene ID
   * @returns Scene content if successful; otherwise null
   */
  const fetchSceneContent = async (sceneId: string) => {
    const results = await api.get<ContentBlock[]>(`adv/scenes/${sceneId}/content`)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to fetch scene content. (%d)', results.status)
      return null
    }
  }

  /**
 * Add content to a specific scene
 * @param sceneId Scene ID
 * @param content ContentBlock object
 * @returns Created content if successful; otherwise null
 */
  const addSceneContent = async (sceneId: string, content: ContentBlock) => {
    const results = await api.post<ContentBlock>(`adv/scenes/${sceneId}/content`, content)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to add scene content. (%d)', results.status)
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
    const results = await api.patch<ContentBlock>(`adv/scenes/${sceneId}/content/${content._id}`, content)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to update scene content. (%d)', results.status)
      return null
    }
  }

  /**
   * Delete content from a specific scene
   * @param sceneId Scene ID
   * @param contentId Content ID
   * @returns true if successful; otherwise false
   */
  const deleteSceneContent = async (sceneId: string, contentId: string) => {
    const results = await api.delete<null>(`adv/scenes/${sceneId}/content/${contentId}`)
    if (results.ok) {
      return true
    } else {
      console.warn('Unable to delete scene content. (%d)', results.status)
      return false
    }
  }

  /**
   * Add a new transition to a scene
   * @param sceneId Scene ID
   * @param transition Transition object
   * @returns Created transition if successful; otherwise null
   */
  const addTransition = async (sceneId: string, transition: Transition) => {
    const results = await api.post<Transition>(`adv/scenes/${sceneId}/transitions`, transition)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to add transition. (%d)', results.status)
      return null
    }
  }

  /**
   * Update a transition in a scene
   * @param sceneId Scene ID
   * @param transition Transition object (must include _id)
   * @returns Updated transition if successful; otherwise null
   */
  const updateTransition = async (sceneId: string, transition: Transition) => {
    const results = await api.patch<Transition>(`adv/scenes/${sceneId}/transitions/${transition._id}`, transition)
    if (results.ok) {
      return results.data
    } else {
      console.warn('Unable to update transition. (%d)', results.status)
      return null
    }
  }

  /**
   * Delete a transition from a scene
   * @param sceneId Scene ID
   * @param transitionId Transition ID
   * @returns true if successful; otherwise false
   */
  const deleteTransition = async (sceneId: string, transitionId: string) => {
    const results = await api.delete<null>(`adv/scenes/${sceneId}/transitions/${transitionId}`)
    if (results.ok) {
      return true
    } else {
      console.warn('Unable to delete transition. (%d)', results.status)
      return false
    }
  }

  return {
    fetchAdventures,
    fetchStorylines,
    addStoryline,
    fetchStoryline,
    updateStoryline,
    publishStoryline,
    unpublishStoryline,
    addChapter,
    fetchChapter,
    updateChapter,
    fetchScenes,
    addScene,
    fetchScene,
    updateScene,
    fetchSceneContent,
    addSceneContent,
    updateSceneContent,
    deleteSceneContent,
    addTransition,
    updateTransition,
    deleteTransition,
  }
}