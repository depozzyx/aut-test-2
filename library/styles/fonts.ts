import { TCustomFonts, TDefaultFonts } from './types/fonts'

const defaultFonts: TDefaultFonts = {
  f1: `
    font-size: 46px;
    line-height: 64px;       
    letter-spacing: 0;
    font-weight: 400;
  `,
  f2: `
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0;
    font-weight: 600;
  `,
  f3: `
    font-size: 18px;
    line-height: 32px;
    letter-spacing: 0;
    font-weight: 400;
  `,
  f4: `
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    font-weight: 700;
  `,
  f5: `
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0;
    font-weight: 400;
  `,
  f6: `
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0;
  `,
  f7: `
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0;
  `,
}

const customFonts: TCustomFonts = {
  // add font variables from your design here
  '': '',
}

export const fonts = { ...defaultFonts, ...customFonts }
