import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints, formatCssProperty } from '@peiko/styled'
import { TGridContainerProps, TGridItemProps, TItemColumn } from './types'

const ITEM_COLUMNS_DEFAULT = 6

export const Container = styled.div<{
  $spacing: TGridContainerProps['spacing']
  spacingColumn: TGridContainerProps['spacingColumn']
  spacingRow: TGridContainerProps['spacingRow']
  columns: TGridContainerProps['columns']
  styles: TGridContainerProps['styles']
}>((props) => {
  const { styles, theme, $spacing, spacingRow, spacingColumn, columns } = props

  return css`
    display: grid;

    ${propertyBreakpoints({
      props: $spacing,
      values: (value) => css`
        gap: ${formatCssProperty(value, 'px')};
      `,
    })}

    ${propertyBreakpoints({
      props: spacingRow,
      values: (value) => css`
        grid-row-gap: ${formatCssProperty(value, 'px')};
      `,
    })}

    ${propertyBreakpoints({
      props: spacingColumn,
      values: (value) => css`
        grid-column-gap: ${formatCssProperty(value, 'px')};
      `,
    })}

    ${propertyBreakpoints({
      props: columns,
      values: (value) => css`
        ${`grid-template-columns: repeat(${value}, 1fr);`}
      `,
    })}

   

    ${styles && styleToCss(styles, theme)}
  `
})
export const Item = styled.div<{ styles: TGridItemProps['styles'] } & TItemColumn>(
  (props) => {
    const { theme, styles } = props

    return css`
      grid-column-end: span ${ITEM_COLUMNS_DEFAULT};

      ${propertyBreakpoints({
        props,
        values: (value) => css`
          ${`grid-column-end: span ${value};`}
        `,
      })}

      ${styles && styleToCss(styles, theme)}
    `
  },
)
