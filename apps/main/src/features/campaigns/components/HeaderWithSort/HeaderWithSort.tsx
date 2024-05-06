import { FC } from 'react'
import { Flex } from '@/components/Flex'
import { SortIcon } from '@/icons/SortIcon'
import { Text } from '@peiko/components/Text'

type THeaderWithSortProps = {
  title: string
  onClick: () => void
}

export const HeaderWithSort: FC<THeaderWithSortProps> = ({
  title,
  onClick,
}): JSX.Element => (
  <Flex align="center" onClick={onClick} styles={{ cursor: 'pointer' }}>
    <Text variant="f10" color="base">
      {title}
    </Text>
    <SortIcon />
  </Flex>
)
