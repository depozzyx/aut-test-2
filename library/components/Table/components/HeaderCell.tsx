import { isValidElement } from 'react'
import styled, { css } from 'styled-components'
import { Text } from '@peiko/components/Text'
import { THeaderCellProps } from '../types'
import {
  ROW_PADDING_TOP,
  ROW_PADDING_BOTTOM,
  ROW_PADDING_LEFT,
  ROW_PADDING_RIGHT,
  COLUMN_GAP,
  BORDER_RADIUS,
} from '../constants'

const Cell = styled.div<THeaderCellProps>(
  ({ isFirstCell, isEndCell, whiteSpace }) => css`
    padding-top: ${ROW_PADDING_TOP};
    padding-bottom: ${ROW_PADDING_BOTTOM};
    padding-left: ${isFirstCell ? ROW_PADDING_LEFT : `calc(${COLUMN_GAP} / 2)`};
    padding-right: ${isEndCell ? ROW_PADDING_RIGHT : `calc(${COLUMN_GAP} / 2)`};
    white-space: ${whiteSpace};
    background-color: ${({ theme }) => theme.palette.main4};
    height: 46px;
    display: flex;
    align-items: center;

    ${isFirstCell &&
    css`
      border-top-left-radius: ${BORDER_RADIUS};
      border-bottom-left-radius: ${BORDER_RADIUS};
    `}

    ${isEndCell &&
    css`
      border-top-right-radius: ${BORDER_RADIUS};
      border-bottom-right-radius: ${BORDER_RADIUS};
    `}
  `,
)

export const HeaderCell: React.FC<THeaderCellProps> = ({ children, ...props }) => {
  const isChildrenReactComponent = isValidElement(children)

  if (isChildrenReactComponent) {
    return <Cell {...props}>{children}</Cell>
  }

  return (
    <Cell {...props}>
      <Text variant="f10" color="base">
        {children}
      </Text>
    </Cell>
  )
}
