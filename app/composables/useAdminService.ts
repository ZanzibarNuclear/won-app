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

  const fetchFluxRatings = async (limit = 10, offset = 0, ratingsFilter = []) => {
    console.log('Get flux ratings for review')

    const params = new URLSearchParams()
    params.append('limit', limit.toString())
    params.append('offset', offset.toString())
    ratingsFilter.forEach(key => {
      params.append('ratings', key)
    })
    const url = `flux-moderation/ratings?${params.toString()}`

    const ratings = await api.get<FluxRatingBatch>(url)
    if (ratings.status === 200) {
      return ratings.data
    } else {
      console.log('Something went wrong:' + ratings.status)
      return null
    }
  }

  return {
    fetchSystemUsers,
    showApiKeys,
    assignApiKey,
    fetchFluxRatings
  }
}