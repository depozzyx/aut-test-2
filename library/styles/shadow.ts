import { TCustomShadow, TDefaultShadow } from './types/shadow'

const defaulShadow: TDefaultShadow = {
  card: '4px 4px 15px rgba(94, 91, 92, 0.15)',
  table: '0px 0px 6px 0px rgba(40, 63, 123, 0.12)',
}

const customShadow: TCustomShadow = {
  // add shadow variables from your design here
}

export const shadow = { ...defaulShadow, ...customShadow }
