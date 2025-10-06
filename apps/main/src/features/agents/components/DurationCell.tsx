import React from 'react'
import { InfoColumn } from '@/components/InfoColumn'
import { formatDuration } from '@/utils/date-to-string'
import { useDurationNow } from '../lib/useDurationNow'

type Props = {
  startedAt?: number | null
  baseSeconds?: number
}

const DurationCellInner: React.FC<Props> = ({ startedAt, baseSeconds = 0 }) => {
  const now = useDurationNow(1000)
  let seconds = baseSeconds
  if (startedAt) {
    seconds = baseSeconds + Math.max(0, Math.floor((now - startedAt) / 1000))
  }
  return <InfoColumn title={seconds ? formatDuration(seconds) : ''} />
}

export const DurationCell = React.memo(DurationCellInner)
DurationCell.displayName = 'DurationCell'
