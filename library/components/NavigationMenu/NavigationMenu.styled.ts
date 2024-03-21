import styled from 'styled-components'

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`

const TRANSITION_DURATION = '0.2s'
const TRANSITION_TIMING_FUNCTION = 'ease-in-out'

export const ItemContainer = styled.div`
  list-style: none;
  width: 100%;
`

export const MenuButton = styled.button<{
  isChild?: boolean
  isActive?: boolean
  disabled?: boolean
}>`
  width: 100%;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  border-radius: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  color: ${({ isActive, theme }) => (isActive ? theme.palette.main2 : 'inherit')};
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  min-width: 0px;
  box-sizing: border-box;
  text-align: left;
  padding: 8px 16px;
  padding-left: ${({ isChild }) => (isChild ? '32px' : '16px')};
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  :focus {
    background-color: ${({ theme }) => theme.palette.base2};
  }

  :hover {
    background-color: ${({ theme }) => theme.palette.base3};
  }

  :active {
    background-color: ${({ theme }) => theme.palette.base2};
  }
`

export const CollapseContainer = styled.div`
  & .collapse {
    transition: height ${TRANSITION_DURATION} ${TRANSITION_TIMING_FUNCTION};
  }
`

export const CollapseButton = styled(MenuButton)`
  justify-content: space-between;
  gap: 16px;
`
