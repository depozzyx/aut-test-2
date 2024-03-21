import React from 'react'
import { FilledIconButton } from '@peiko/components/buttons/FilledIconButton'
import { TIconButtonProps } from '@peiko/components/buttons/types'

type TDotProps = {
  size?: TIconButtonProps['size']
}

const DotsString = '...'

export const Dots: React.FC<TDotProps> = (props) => (
  <FilledIconButton disabled {...props}>
    {DotsString}
  </FilledIconButton>
)
