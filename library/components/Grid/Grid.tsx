import { TGridProps } from './types'
import { Container, Item } from './Grid.styles'

export const Grid: React.FC<TGridProps> = ({
  children,
  spacing = 16,
  spacingColumn,
  spacingRow,
  columns = 12,
  container,
  styles,
  ...props
}) => {
  if (container)
    return (
      <Container
        $spacing={spacing}
        spacingColumn={spacingColumn}
        spacingRow={spacingRow}
        columns={columns}
        styles={styles}
      >
        {children}
      </Container>
    )

  return (
    <Item {...props} styles={styles}>
      {children}
    </Item>
  )
}
