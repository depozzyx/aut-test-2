import { useState, useEffect } from 'react'

export const useCounter = (
  value: number,
  timeout: number,
): {
  count: number
  resetCount: () => void
  stopCounter: () => void
  startCounter: () => void
} => {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (isRunning && count === value && intervalId !== null) clearInterval(intervalId)
    if (isRunning) {
      const id = setInterval(() => {
        setCount((prevCount) => (prevCount < value ? prevCount + 1 : value))
      }, timeout / value)
      setIntervalId(id)
    } else if (intervalId !== null) clearInterval(intervalId)

    return () => clearInterval(intervalId as NodeJS.Timer)
  }, [isRunning, value, timeout])

  const resetCount = () => {
    setCount(0)
    setIsRunning(false)
  }

  const stopCounter = () => {
    setIsRunning(false)
  }

  const startCounter = () => {
    setIsRunning(true)
  }

  return { count, resetCount, stopCounter, startCounter }
}
