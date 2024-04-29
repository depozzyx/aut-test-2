import styled, { css } from 'styled-components'

type TTabProps = {
  isActive: boolean
  tabSize?: string
}

export const Tab = styled.button<TTabProps>((props) => {
  const { isActive, theme, tabSize } = props

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    max-width: ${tabSize ?? '242px'};
    width: 100%;
    height: 48px;
    padding: 12px, 40px;
    border-bottom: 2px solid ${theme.palette.main22};
    font-weight: 500;
    font-size: 16px;
    line-height: 125%;
    color: ${theme.palette.main22};
    transition: 0.25s;

    ${isActive &&
    css`
      border-bottom: 2px solid ${theme.palette.main2};
      color: ${theme.palette.main2};
    `}

    &:hover {
      cursor: pointer;
      border-bottom: 2px solid ${theme.palette.main4};
      background-color: ${theme.palette.main4};
      color: ${theme.palette.main20};
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid ${theme.palette.main3};
      background-color: ${theme.palette.main3};
      color: ${theme.palette.main20};
    }

    &:disabled {
      border-bottom: 2px solid ${theme.palette.main22};
      color: ${theme.palette.main22};
      background-color: transparent;
      cursor: not-allowed;
    }
  `
})
