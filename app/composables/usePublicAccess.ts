import type { PublicUserProfile } from '~/types/won-types'

export function usePublicAccess() {

  const api = useWonServiceApi()

  const findProfile = async (handle: string) => {
    try {
      const response = await api.get('profiles/' + handle)
      return response.data
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        console.warn(`Profile with handle "${handle}" not found.`)
        return null
      } else {
        console.error(err)
        throw err
      }
    }
  }

  return {
    findProfile
  }
}