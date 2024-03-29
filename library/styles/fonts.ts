import { TDefaultFonts } from './types/fonts'

const defaultFonts: TDefaultFonts = {
  f1: `
    font-size: 36px;
    line-height: 42px;       
    letter-spacing: 1px;
    font-weight: 900;
  `,
  f2: `
    font-size: 26px;
    line-height: 36px;
    letter-spacing: 0;
    font-weight: 500;
  `,
  f3: `
    font-size: 22px;
    line-height: 30px;
    letter-spacing: 0;
    font-weight: 700;
  `,
  f4: `
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0;
    font-weight: 600;
  `,
  f5: `
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0;
    font-weight: 400;
  `,
  f6: `
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0;
  `,
  f7: `
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
  `,
  f8: `
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
  `,
  f9: `
    font-size: 16px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: 0;
  `,
  f10: `
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
  `,
  f11: `
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0;
  `,
}

export const fonts = { ...defaultFonts }
