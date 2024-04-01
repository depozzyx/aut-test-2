import styled, { css } from 'styled-components'

const TRANSITION_DURATION = '200ms'
const TRANSITION_TIMING_FUNCTION = 'ease-in-out'

export const TargetElement = styled.span`
  position: relative;
  transition-property: border-color, border-width, box-shadow;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.palette.main10};
  border-radius: 50%;
`

export const Wrapper = styled.label<{ disabled?: boolean; error?: string }>((props) => {
  const { disabled, error } = props
  const { palette, fonts } = props.theme

  return css`
    color: ${palette.main8};
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    gap: 8px;
    user-select: none;
    ${fonts.f5}
    transition-property: color;
    transition-duration: ${TRANSITION_DURATION};
    transition-timing-function: ${TRANSITION_TIMING_FUNCTION};

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;

      &:focus ~ ${TargetElement} {
        box-shadow: 0 0 0px 2px ${(props) => props.theme.palette.base};
      }
    }

    &:hover {
      ${TargetElement} {
        box-shadow: 0 0 0px 2px ${(props) => props.theme.palette.base};
      }
    }

    input:checked ~ ${TargetElement} {
      border-width: 2px;
      border-color: ${palette.main2};
      position: relative;
      &:after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${palette.main};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    ${disabled &&
    css`
      color: ${palette.main12};
      pointer-events: none;
      ${TargetElement} {
        box-shadow: none;
        border-color: ${palette.main12};
      }
    `}

    ${error &&
    css`
      input:checked ~ ${TargetElement} {
        border-color: ${palette.main7};
        position: relative;
        &:after {
          background: ${palette.main7};
        }
      }

      ${TargetElement} {
        border-color: ${palette.main7};
      }
    `}
  `
})

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
