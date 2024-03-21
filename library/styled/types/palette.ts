import { CSSProperties } from 'styled-components'

export type Color = CSSProperties['color']

export type TDefaultPalette = {
  overlay: string
  overlay2: string
  overlay3: string
  base: Color
  base2: Color
  base3: Color
  base4: Color
  base100: Color
  base200: Color
  main: Color
  main2: Color
  main3: Color
  main4: Color
  main5: Color
  main6: Color
  main7: Color
  main8: Color
  main9: Color
  main10: Color
  main11: Color
  main12: Color
  main13: Color
}

export type TCustomPalette = {
  bgColour: Color
  textWhite: Color
}

export type TPalette = TDefaultPalette & TCustomPalette
