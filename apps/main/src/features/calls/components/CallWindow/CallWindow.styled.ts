import { Flex } from '@/components/Flex'
import styled from 'styled-components'

export const Wrapper = styled(Flex)`
  width: 200px;
  height: 200px;
  border: 8px solid ${({ theme }) => theme.palette.main2};
  background-color: ${({ theme }) => theme.palette.base2};
  border-radius: 50%;
`
