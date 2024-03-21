import styled, { css } from 'styled-components'

export const Separator = styled.div(() => {
  const common = `
  content: '';
  position: absolute;
  width: 45%;
  height: 1px;
  background: #000;
  `
  return css`
    position: relative;
    margin: 12px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      ${common}
      left: 0;
    }
    &::after {
      ${common}
      right: 0;
    }
  `
})
