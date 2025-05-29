import type { Flag, ReasonCodeType } from "~/types/won-types"

export function useFlagService() {
  const userStore = useUserStore()
  const api = useWonServiceApi()

  const fetchReasonCodes = async () => {
    const results = await api.get<ReasonCodeType[]>('flags/reason-codes')
    console.log('%o', results)
    if (results.ok) {
      return results.data
    } else {
      return []
    }
  }

  const flagFlux = async (fluxId: number, reasons: string[] | null | undefined, message: string | null | undefined) => {
    if (!userStore.isSignedIn) {
      console.warn('Only known members can flag a flux post')
      return
    }
    if (!reasons || reasons.length === 0) {
      console.warn('We must know the reason')
      return
    }
    const details = {
      fluxId,
      reasons,
      message
    }
    const results = await api.post<Flag>(`flags/flux`, details)
    console.log('%o', results)
    return results.data
  }

  const fetchFlags = async (limit: number, offset: number, filters: any) => {
    const params = new URLSearchParams()
    if (limit) {
      params.append('limit', limit.toString())
    }
    if (filters.unresolved) {
      params.append('unresolved', 'true')
    } else {
      params.append('offset', offset.toString())
    }
    const url = `flags?${params.toString()}`
    const results = await api.get<Flag[]>(url)
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get flags. (%d)', results.status)
      return []
    }
  }

  return {
    fetchReasonCodes,
    flagFlux,
    fetchFlags
  }
}