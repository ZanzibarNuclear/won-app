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

  const flagFlux = async (fluxId: number, reasons: string[], message: string) => {
    if (!userStore.isSignedIn) {
      console.warn('Only known members can flag a flux post')
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

  return {
    fetchReasonCodes,
    flagFlux
  }
}