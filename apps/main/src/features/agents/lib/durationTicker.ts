type Listener = () => void

class DurationTicker {
  private listeners = new Set<Listener>()

  private now = Date.now()

  private timer: ReturnType<typeof setInterval> | null = null

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    this.ensureStarted()
    return () => {
      this.listeners.delete(listener)
      this.maybeStop()
    }
  }

  getNow() {
    return this.now
  }

  private ensureStarted(interval = 1000) {
    if (this.timer) return
    this.timer = setInterval(() => {
      this.now = Date.now()
      this.listeners.forEach((l) => l())
    }, interval)
  }

  private maybeStop() {
    if (this.listeners.size === 0 && this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

export const durationTicker = new DurationTicker()
