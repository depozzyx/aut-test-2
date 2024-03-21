import styled, { css } from 'styled-components'
import { propertyBreakpoints } from '@peiko/styled'
import { Text } from '@peiko/components/Text'
import { TBreadCrumbsProps } from './types'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.palette.main2};
`

export const Divider = styled.div`
  align-items: center;
`

const getDisplayWrapper = (showed: TBreadCrumbsProps['showed'], index: number) => {
  if (Array.isArray(showed)) {
    return showed.includes(index) ? 'flex' : 'none'
  }

  return 'flex'
}

const getDisplayDivider = (showed: TBreadCrumbsProps['showed'], index: number) => {
  if (Array.isArray(showed)) {
    return showed[showed.length - 1] === index ? 'none' : 'flex'
  }

  return 'flex'
}

export const Wrapper = styled.div<{
  showed: TBreadCrumbsProps['showed']
  index: number
}>(
  ({ showed, index }) => css`
    gap: 8px;
    display: ${getDisplayWrapper(showed, index)};

    ${propertyBreakpoints({
      props: showed,
      values: (value) => css`
        display: ${getDisplayWrapper(value, index)};
      `,
    })}

    ${Divider} {
      display: ${getDisplayDivider(showed, index)};

      ${propertyBreakpoints({
        props: showed,
        values: (value) => css`
          display: ${getDisplayDivider(value, index)};
        `,
      })};
    }
  `,
)

export const Item = styled(Text)<{ disabled?: boolean }>`
  text-align: center;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? 'none' : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }
`
