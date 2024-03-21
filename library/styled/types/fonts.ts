type DefaultFontVariant = 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7'
type CustomFontVariant = ''

export type TFontVariant = DefaultFontVariant | CustomFontVariant

export type TDefaultFonts = Record<DefaultFontVariant, string>
export type TCustomFonts = Record<CustomFontVariant, string>

export type TFonts = Record<TFontVariant, string> & Record<CustomFontVariant, string>
