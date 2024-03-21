import styled from 'styled-components'

const BORDER_RADIUS = '24px'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 8px;

  background: ${({ theme }) => theme.palette.base3};
  border: 1px solid ${({ theme }) => theme.palette.main11};
  border-radius: ${BORDER_RADIUS};
`
