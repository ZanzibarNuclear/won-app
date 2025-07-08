import type { NameTag, Inspiration } from "~/types/won-types"

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

  const isHandleAvailable = async (handle: string) => {
    try {
      const response = await api.get<boolean>('profiles/' + handle + '/available')
      console.log('Is suggested handle ' + handle + ' available?' + response)
      return response.data
    } catch (err: any) {
      console.error(err)
    }
  }

  const getMemberNameTags = async (): Promise<NameTag[]> => {
    try {
      // TODO: make use of limit and offset for infinite fetch --- at the point where this is a problem, ~100+ members?
      const response = await api.get<NameTag[]>('profiles/name-tags')
      return response.data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const getRandomInspiration = async (): Promise<Inspiration | null> => {
    try {
      const response = await api.get<Inspiration>('inspirations/random')
      return response.data
    } catch (err: any) {
      console.error('Failed to fetch random inspiration:', err)
      return null
    }
  }

  return {
    findProfile,
    getMemberNameTags,
    isHandleAvailable,
    getRandomInspiration
  }
}