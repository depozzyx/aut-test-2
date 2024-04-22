import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import styled from 'styled-components'

export const Button = styled(FilledButton)`
  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  svg {
    width: 14px !important;
    height: 14px !important;
  }
`

export const Icon = styled(PlusIcon)``
