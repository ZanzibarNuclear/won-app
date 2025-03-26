export function useWonFeedback() {

  const api = useWonServiceApi()

  const submitUserFeedback = async (context: object, message: string) => {
    const response = await api.post('feedback', {
      context, message
    })
    return response
  }

  return {
    submitUserFeedback
  }
}