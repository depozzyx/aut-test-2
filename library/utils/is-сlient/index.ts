type TIsClient = () => boolean

export const isClient: TIsClient = () => typeof window !== 'undefined'
