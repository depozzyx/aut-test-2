import {
  NameType,
  Payload,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export type TSimpleChartData = {
  date: string
  [key: string]: string | number
}

export type TXAxisProps = {
  x: number
  y: number
  payload: { value: string }
}

export type TAxisTickYProps = {
  x: number
  y: number
  payload: {
    value: number
  }
}

type TCustomLabel = {
  [key: string]: string
}

export type TTooltipProps = {
  payload: Payload<ValueType, NameType>[] | undefined
  active: boolean | undefined
  customLabel?: TCustomLabel
}
