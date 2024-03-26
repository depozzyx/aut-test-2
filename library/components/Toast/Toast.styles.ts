import styled, { css } from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const Container = styled(ToastContainer)<{ offsetY?: number }>((props) => {
  const { offsetY, theme } = props
  const { fonts, palette } = theme

  return css`
    &&&.Toastify__toast-container {
      padding: 0px 16px;
      top: ${offsetY}px;
    }

    &&&.Toastify__toast-container--bottom-center {
      bottom: 0;
      top: unset;
    }

    .Toastify__toast {
      display: flex;
      align-items: center;
      border-radius: 12px;
      box-shadow: none;
      padding: 8px 24px;
      ${fonts.f5};
      line-height: 24px;
      background-color: ${palette.base3};
    }

    .Toastify__close-button {
      align-self: center;
      margin-left: 8px;
      line-height: 0;
      opacity: 1;
    }

    .Toastify__close-button svg {
      fill: ${palette.main2};
    }

    .Toastify__toast-icon {
      display: none;
    }

    .Toastify__progress-bar {
      background: ${palette.main2};
    }
  `
})

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`
