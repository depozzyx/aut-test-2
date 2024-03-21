import { TCustomPalette, TDefaultPalette } from './types/palette'

const defaultPalete: TDefaultPalette = {
  base: '#111E21',
  base2: '#1D292C',
  base3: '#243033',
  base4: '#2B3739',
  base100: '#0E4854',
  base200: '#0F3A43',
  main: 'linear-gradient(88.44deg, #08CCB4 0%, #08ABCC 100%, #08ABCC 100%)',
  main2: '#52C4DB',
  main3: '#08CCB4',
  main4: '#84E793',
  main5: '#FFBF66',
  main6: '#6CB5FF',
  main7: '#F76D6D',
  main8: '#E0E2E2',
  main9: '#EBEDED',
  main10: '#BCC0C1',
  main11: '#A0A5A6',
  main12: '#6B7375',
  main13: 'background: linear-gradient(88.44deg, #079489 0%, #08ABCC 100%, #078394 100%)',
  overlay: '#111E21E5',
  overlay2: '#00000026',
  overlay3: '#374244',
}

const customPalette: TCustomPalette = {
  bgColour: '#272727',
  textWhite: '#ffffff',
}

export const palette = { ...defaultPalete, ...customPalette }

export const darktPalete = {
  bgColour: '#272727',
}
