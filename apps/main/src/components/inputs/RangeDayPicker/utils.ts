import { format } from 'date-fns'
import { Translate } from 'next-translate'

type TGetDateBtnLabelParams = {
  from?: Date
  to?: Date
  t: Translate
}

export const getDateButtonLabel = ({ from, to, t }: TGetDateBtnLabelParams): string => {
  const formattedFrom = from ? format(from, 'dd/MM/yyyy') : ''
  const formattedTo = to ? format(to, 'dd/MM/yyyy') : ''

  if (from && to) {
    return `${formattedFrom} - ${formattedTo}`
  }
  if (from) {
    return `${formattedFrom} -`
  }
  if (to) {
    return `- ${formattedTo}`
  }
  return t('datepicker:date')
}
