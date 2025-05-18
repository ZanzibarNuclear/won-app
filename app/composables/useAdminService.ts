import type { Users, UsersReturned } from '~/types/won-types'

export function useAdminService() {

  const api = useWonServiceApi()

  const fetchSystemUsers = async () => {
    const response = await api.get<UsersReturned>('access/users')
    const { items, total, hasMore } = response.data

    console.log('found ' + total + ' users')
    console.log(hasMore ? 'there are more.' : 'that is all.')

    return items
  }

  return {
    fetchSystemUsers
  }
}