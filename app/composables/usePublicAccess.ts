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

  const getMemberNameTags = async () => {
    try {
      // TODO: make use of limit and offset for infinite fetch --- at the point where this is a problem, ~100+ members?
      const response = await api.get('profiles/name-tags')
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  return {
    findProfile,
    getMemberNameTags
  }
}