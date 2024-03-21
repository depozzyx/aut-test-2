import { TCustomShadow, TDefaultShadow } from './types/shadow'

const defaulShadow: TDefaultShadow = {
  card: '4px 4px 15px rgba(94, 91, 92, 0.15)',
}

const customShadow: TCustomShadow = {
  // add shadow variables from your design here
}

export const shadow = { ...defaulShadow, ...customShadow }
