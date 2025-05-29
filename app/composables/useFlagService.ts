import type { Flag, ReasonCodeType, FlagsReturned } from "~/types/won-types"

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

  const fetchUnresolvedFlags = async (limit?: number) => {
    const params = new URLSearchParams()
    if (limit) {
      params.append('limit', limit.toString())
    }
    const url = `flags/unresolved?${params.toString()}`
    const results = await api.get<FlagsReturned>(url)
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get flags. (%d)', results.status)
      return []
    }
  }

  const resolveFlag = async (flagId: number, note?: string) => {
    const results = await api.put<Flag>(`flags/${flagId}/resolve`, { note })
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to resolve flag. (%d)', results.status)
      return null
    }
  }

  return {
    fetchReasonCodes,
    flagFlux,
    fetchUnresolvedFlags,
    resolveFlag
  }
}