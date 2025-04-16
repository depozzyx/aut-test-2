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
  <Flex align="center" onClick={onClick} styles={{ cursor: 'pointer' }}>
    <Text variant="f10" color="base">
      {title}
    </Text>
    <SortIcon order={order} />
  </Flex>
)
