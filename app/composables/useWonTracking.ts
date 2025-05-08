export function useWonTracking() {

  const api = useWonServiceApi()

  const fetchEvents = async (offset = 0, batchSize = 10, from: Date, to: Date, actor: string) => {
    console.log(`offset=${offset} batch size=${batchSize}`)
    const nextPage = offset / batchSize + 1
    console.log('page', nextPage)

    const query = new URLSearchParams()
    query.append('offset', offset.toString())
    query.append('limit', batchSize.toString())
    if (from) query.append('from', batchSize.toString())
    if (to) query.append('to', batchSize.toString())
    // if (ascending) query.append('asc', 'false')
    if (actor) query.append('actor', actor)

    const events = await api.get('events?' + query.toString())
    return events
  }

  /**
   * Free-form way to capture anything that happens
   * @param details any object - stored as JSON
   */
  const logEvent = async (details: any) => {
    await api.post('events', { details })
  }

  /**
   * For capturing interest in an offer, responding to a pitch.
   * @param details any object - stored as JSON
   */
  const logInterest = async (offer: string) => {
    await logEvent({
      type: 'interest',
      offer,
    })
  }

  return {
    fetchEvents,
    logInterest,
  }
}