import type { UsersReturned, ApiKeys } from '~/types/won-types'

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

  return {
    fetchSystemUsers,
    showApiKeys,
    assignApiKey
  }
}