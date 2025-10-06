import { FC } from 'react'
import { Flex } from '@/components/Flex'
import { SortIcon } from '@/icons/SortIcon'
import { Text } from '@peiko/components/Text'
import { TOrder } from '@/types/entities/order'

type THeaderWithSortProps = {
  title: string
  onClick: () => void
  order?: TOrder
}

export const HeaderWithSort: FC<THeaderWithSortProps> = ({
  title,
  onClick,
  order,
}): JSX.Element => (
  <Flex align="center" onClick={onClick} styles={{ width: '100%', cursor: 'pointer' }}>
    <Text
      variant="f10"
      color="base"
      styles={{ width: '100%', textAlign: 'center', userSelect: 'none' }}
    >
      {title}
    </Text>
    <SortIcon order={order} />
  </Flex>
)
