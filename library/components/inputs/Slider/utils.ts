import { SliderValues } from './types'

type TProps = {
  def: SliderValues
  min: number
  max: number
}

type TNormalizeDefault = (props: TProps) => SliderValues

export const normalizeDefaultValue: TNormalizeDefault = ({ def, min, max }) => {
  if (def.length === 0) return [min, max]
  if (def.length === 1) return [def[0]]

  const getMin = () => {
    if (def[0] < min || def[0] > max) return min
    return def[0]
  }

  const getMax = () => {
    if (def[1] > max || def[1] < min) return max
    return def[1]
  }

  if (def[0] > def[1]) {
    return [min, max]
  }

  return [getMin(), getMax()]
}
