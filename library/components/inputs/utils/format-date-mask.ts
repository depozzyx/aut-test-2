import { TDateFormat } from '../DayPickerInput/types'

export const formatToMask = (dateFormat: TDateFormat): string => {
  const replacements: Record<'yyyy' | 'MM' | 'dd', string> = {
    yyyy: '9999',
    MM: '99',
    dd: '99',
  }

  let mask = dateFormat as string

  Object.keys(replacements).forEach((key) => {
    mask = mask.replace(key, replacements[key as keyof typeof replacements])
  })

  return mask
}
