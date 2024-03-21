export const tutorial = {
  set(): void {
    localStorage.setItem('isTutorial', 'true')
  },
  get(): string | null {
    return localStorage.getItem('isTutorial')
  },
  remove(): void {
    localStorage.removeItem('isTutorial')
  },
}
