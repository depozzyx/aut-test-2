import { useEffect, useState } from 'react'
import { durationTicker } from './durationTicker'

export function useDurationNow(interval = 1000): number {
  const [now, setNow] = useState<number>(() => durationTicker.getNow())

  useEffect(() => {
    const unsubscribe = durationTicker.subscribe(() => setNow(durationTicker.getNow()))
    return unsubscribe
  }, [interval])

  return now
}
