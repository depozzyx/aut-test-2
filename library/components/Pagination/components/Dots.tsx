import React from 'react'
import { FilledIconButton } from '@peiko/components/buttons/FilledIconButton'
import { TIconButtonProps } from '@peiko/components/buttons/types'
import { useTheme } from 'styled-components'

type TDotProps = {
  size?: TIconButtonProps['size']
}

const DotsString = '...'

export const Dots: React.FC<TDotProps> = (props) => {
  const theme = useTheme()
  return (
    <FilledIconButton
      disabled
      {...props}
      styles={{
        backgroundColor: 'transparent !important',
        color: `${theme.palette.main5} !important`,
      }}
    >
      {DotsString}
    </FilledIconButton>
  )
}
