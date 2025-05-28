import type { Flag } from "~/types/won-types"

export function useFlagService() {
  const userStore = useUserStore()
  const api = useWonServiceApi()

  const fetchReasonCodes = async () => {
    const results = await api.get('flags/reason-codes')
    console.log('%o', results)
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