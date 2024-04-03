import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'

export const Container = styled(Flex)(
  ({ theme }) => css`
    min-height: 'calc(100vh - var(--header-height))';
    flex: 0 0 100px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.palette.main4};
  `,
)
