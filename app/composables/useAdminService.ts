import type { UsersReturned, ApiKeys, FluxRatingBatch } from '~/types/won-types'

export function useAdminService() {

  const api = useWonServiceApi()

  const fetchSystemUsers = async () => {
    console.log('Looking for users')
    const response = await api.get<UsersReturned>('access/users')
    const { items, total, hasMore } = response.data

    console.log('found ' + total + ' users')
    console.log(hasMore ? 'there are more.' : 'that is all.')

    return items
  }

  const showApiKeys = async (userId: string) => {
    console.log('Show all keys for system users')
    const keys = await api.get<ApiKeys[]>('access/keys?userId=' + userId)
    console.log('keys: ' + JSON.stringify(keys))
    return keys.data
  }

  const assignApiKey = async (userId: string) => {
    console.log('Requesting key for system user')
    const key = await api.post<ApiKeys>('access/keys', { userId })
    console.log('key: ' + JSON.stringify(key))
    return key.data
  }

  const fetchFluxRatings = async (limit: number, offset: number, ratingsFilter: string[] = [], needsReview = true) => {
    console.log('Get flux ratings for review')

    const params = new URLSearchParams()

    // Always include limit parameter
    params.append('limit', limit.toString())

    // Always include offset parameter (even if 0)
    params.append('offset', offset.toString())

    // Include needsReview parameter if true
    if (needsReview) {
      params.append('needsReview', "true")
    }

    // Add rating filters if provided
    if (ratingsFilter && ratingsFilter.length > 0) {
      ratingsFilter.forEach(key => {
        params.append('ratings', key)
      })
    }

    const url = `flux-moderation/ratings?${params.toString()}`
    console.log(`Fetching ratings with URL: ${url}`)

    try {
      const ratings = await api.get<FluxRatingBatch>(url)
      if (ratings.status === 200) {
        return ratings.data
      } else {
        console.error(`Error fetching ratings: ${ratings.status}`)
        return null
      }
    } catch (error) {
      console.error('Failed to fetch flux ratings:', error)
      return null
    }
  }

  // Confirm a flux rating (approve with current rating)
  const confirmFluxRating = async (id: number) => {
    console.log('Implementation needed: confirmFluxRating for ID:', id)
    const payload = {
      actionTaken: 'accepted',
    }
    await api.put(`flux-moderation/ratings/${id}`, payload)
  }

  // Adjust a flux rating to a different value
  const adjustFluxRating = async (id: number, newRating: string) => {
    console.log('Implementation needed: adjustFluxRating for ID:', id, 'to rating:', newRating)
    // TODO: Implement API call to adjust rating
    // Example: await api.post(`flux-moderation/ratings/${id}/adjust`, { rating: newRating })
    return true
  }

  // Block a flux (hide from view due to policy violation)
  const blockFlux = async (id: number) => {
    console.log('Implementation needed: blockFlux for ID:', id)
    // TODO: Implement API call to block flux
    // Example: await api.post(`flux-moderation/ratings/${id}/block`)
    return true
  }

  // Delete a flux (remove completely)
  const deleteFlux = async (id: number) => {
    console.log('Implementation needed: deleteFlux for ID:', id)
    // TODO: Implement API call to delete flux
    // Example: await api.delete(`flux-moderation/ratings/${id}`)
    return true
  }

  return {
    fetchSystemUsers,
    showApiKeys,
    assignApiKey,
    fetchFluxRatings,
    confirmFluxRating,
    adjustFluxRating,
    blockFlux,
    deleteFlux
  }
}