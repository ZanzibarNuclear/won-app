import type { PublicUserProfile } from '~/types/won-types'

export function usePublicAccess() {

  const api = useWonServiceApi()

  const findProfile = async (handle: string) => {
    try {
      const response = await api.get('profiles/' + handle)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  return {
    findProfile
  }
}