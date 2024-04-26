import styled from 'styled-components'
import { SearchIcon } from '@peiko/components/icons/SearchIcon'

export const SearchFieldIcon = styled(SearchIcon)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 13px !important;
      height: 13px !important;
      path {
        fill: ${({ theme }) => theme.palette.main22} !important;
      }
    }
  }
`
