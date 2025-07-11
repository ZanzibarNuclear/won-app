import type { Flux, FluxesReturned, FluxAuthor, Flag } from "~/types/won-types"

export interface FetchFluxOptions {
  order?: 'hottest' | 'newest' | 'oldest'
  authorId?: number
  fluxId?: number
  limit?: number
  offset?: number
}

export type FluxListType = 'timeline' | 'reactions' | 'author'

interface FluxListContext {
  type: FluxListType
  options: FetchFluxOptions
  total?: number
  hasMore: boolean
  offset: number
}

export function useFluxService() {
  const fluxStore = useFluxStore()
  const userStore = useUserStore()
  const api = useWonServiceApi()

  const loading = ref(false)
  const error = ref(null)

  const currentContext = ref<FluxListContext>({
    type: 'timeline',
    options: {},
    total: undefined,
    hasMore: true,
    offset: 0
  })

  const fetchFluxes = async (type: FluxListType, options: FetchFluxOptions = {}, reset = false) => {
    if (loading.value) {
      console.log('Already loading fluxes, skipping request')
      return []
    }

    loading.value = true
    error.value = null

    try {
      // Reset context if type changes or reset requested
      if (reset || type !== currentContext.value.type) {
        currentContext.value = {
          type,
          options,
          offset: 0,
          hasMore: true
        }
      }

      if (!currentContext.value.hasMore) {
        console.log('no more fluxes to fetch')
        return []
      }

      const query = new URLSearchParams()
      const { order, authorId, fluxId, limit = 4 } = options

      if (order) query.append('order', order)
      if (authorId) query.append('authorId', authorId.toString())
      if (fluxId) query.append('fluxId', fluxId.toString())
      query.append('limit', limit.toString())
      query.append('offset', currentContext.value.offset.toString())

      const response = await api.get<FluxesReturned>(`fluxes?${query.toString()}`)
      const { items, total, hasMore } = response.data

      currentContext.value.hasMore = hasMore
      currentContext.value.total = total
      currentContext.value.offset += items.length

      return items
    } catch (err: any) {
      console.error('Error fetching fluxes:', err)
      error.value = err
      return []
    } finally {
      loading.value = false
    }
  }

  // Simplified public methods for each use case
  const fetchTimeline = async (reset = false) => {
    const items = await fetchFluxes('timeline', { limit: 10 }, reset)
    if (reset) {
      fluxStore.setTimeline(items)
    } else {
      fluxStore.appendToTimeline(items)
    }
    return items
  }

  const fetchReactions = async (fluxId: number, reset = false) => {
    const items = await fetchFluxes('reactions', { fluxId, limit: 10 }, reset)
    if (reset) {
      fluxStore.setReactions(items)
    } else {
      fluxStore.appendToReactions(items)
    }
    return items
  }

  const fetchAuthorFluxes = async (authorId: number, reset = false) => {
    const items = await fetchFluxes('author', { authorId, limit: 10 }, reset)
    if (reset) {
      fluxStore.setTimeline(items)
    } else {
      fluxStore.appendToTimeline(items)
    }
    return items
  }

  /**
   * Fetch any Flux user profile by their handle
   */
  const fetchFluxAuthor = async (userHandle: string) => {
    const results = await api.get<FluxAuthor>(`flux-users/handle-${userHandle}`)
    return results.data
  }

  /**
   * Fetch any Flux user profile by their handle
   */
  const fetchFluxAuthorById = async (authorId: number) => {
    const results = await api.get<FluxAuthor>(`flux-users/id-${authorId}`)
    return results.data
  }

  const getFlux = async (fluxId: number) => {
    const flux = await api.get<Flux>(`fluxes/${fluxId}`)
    if (flux.ok) {
      return flux.data
    } else {
      return null
    }
  }

  /*
   * Protected actions - require the user to be signed in
   */

  const createFlux = async (content: string, parentId: number | null = null) => {
    const result = await api.post<Flux>('fluxes', {
      content,
      parentId,
    })
    console.log('returned new flux:', result.data)
    return result.data
  }

  const updateFlux = async (fluxId: number, content: string) => {
    const result = await api.put<Flux>(`fluxes/${fluxId}`, {
      content
    })
    console.log('returned new flux:', result.data)
    return result.data
  }

  /**
   * Delete own Flux post. Requires authentication.
   */
  const deleteFlux = async (fluxId: number) => {
    // TODO: implement - think through how deleting (hiding the content) of a flux should work, especially if there are reactions
    await api.delete(`fluxes/${fluxId}`)
  }

  const registerView = async (fluxId: number) => {
    try {
      const result = await api.post<Flux>(`fluxes/${fluxId}/view`, {})
      const viewedFlux = result.data
      if (viewedFlux) {
        fluxStore.updateFlux(viewedFlux)
      }
    } catch (error) {
      console.error('Error recording view event:', error)
    }
  }

  const boostFlux = async (fluxId: number) => {
    if (!userStore.isFluxUserLoaded) {
      console.info('Boosting is for Fluxers.')
      return
    }
    try {
      const result = await api.post<Flux | { message: string }>(`fluxes/${fluxId}/boost`, {})
      if (result.status === 200) {
        fluxStore.updateFlux(result.data as Flux)
      } else if (result.status === 201) {
        const { message } = result.data as { message: string }
        console.log(message)
      }
    } catch (error) {
      console.error('Something happened while boosting:', error)
    }
  }

  const deboostFlux = async (fluxId: number) => {
    if (!userStore.isSignedIn) {
      console.warn('User not signed in -- cannot deboost flux')
      return
    }
    const result = await api.delete<Flux>(`fluxes/${fluxId}/boost`)
    return result.data
  }

  return {
    loading,
    error,
    fetchTimeline,
    fetchReactions,
    fetchAuthorFluxes,
    currentContext: readonly(currentContext),
    registerView,
    getFlux,
    createFlux,
    updateFlux,
    boostFlux,
    deboostFlux,
    fetchFluxAuthor,
    fetchFluxAuthorById,
  }
}
