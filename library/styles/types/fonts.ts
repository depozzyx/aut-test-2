type DefaultFontVariant =
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'

export type TFontVariant = DefaultFontVariant

export type TDefaultFonts = Record<DefaultFontVariant, string>

export type TFonts = Record<TFontVariant, string>
