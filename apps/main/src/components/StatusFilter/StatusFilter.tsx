/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomFilterBtn } from './StatusFilter.styled'

type TStatus = {
  label: string
  value: string
}

export type TStatusFilterProps = {
  statuses?: TStatus[]
  onSelect?: (status: string) => void
  title?: string
}

export const StatusFilter = ({
  statuses,
  onSelect,
  title,
}: TStatusFilterProps): JSX.Element => <CustomFilterBtn />
