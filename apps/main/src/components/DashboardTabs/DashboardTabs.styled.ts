import styled, { css } from 'styled-components'

type TTabProps = {
  isActive: boolean
}

export const DashboardTabStyled = styled.button<TTabProps>((props) => {
  const { isActive, theme } = props

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    max-width: 242px;
    width: 100%;
    height: 48px;
    padding: 12px, 40px;
    border-bottom: 2px solid ${theme.palette.main22};
    font-weight: 500;
    font-size: 16px;
    line-height: 125%;
    color: ${theme.palette.main22};

    ${isActive &&
    css`
      border-bottom: 2px solid ${theme.palette.main2};
      color: ${theme.palette.main2};

      svg path {
        fill: ${theme.palette.main2};
      }
    `}

    &:hover {
      cursor: pointer;
      border-bottom: 2px solid ${theme.palette.main4};
      background-color: ${theme.palette.main4};
      color: ${theme.palette.main20};

      svg path {
        fill: ${theme.palette.main20};
      }
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid ${theme.palette.main3};
      background-color: ${theme.palette.main3};
      color: ${theme.palette.main20};

      svg path {
        fill: ${theme.palette.main20};
      }
    }

    &:disabled {
      border-bottom: 2px solid ${theme.palette.main22};
      color: ${theme.palette.main20};
      background-color: ${theme.palette.main21};
      svg path {
        fill: ${theme.palette.main20};
      }
      cursor: not-allowed;
    }
  `
})
