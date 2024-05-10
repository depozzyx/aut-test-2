import { useRouter } from 'next/router'
import { NextLink } from '@peiko/components/links/NextLink'
import { Text } from '@peiko/components/Text'
import { CheckIcon } from '@/icons/CheckIcon'
import { ItemWrapper } from './SidebarItem.styled'

interface ISidebarItemProps {
  title: string
  link?: string
  onClick?: () => void
}

export const SidebarItem = ({ title, link, onClick }: ISidebarItemProps): JSX.Element => {
  const { pathname } = useRouter()

  const content = (
    <ItemWrapper
      padding="10px 16px 10px 36px"
      cursor="pointer"
      onClick={onClick}
      isSelected={pathname === link}
      align="center"
      justify="space-between"
    >
      <Text variant="f10" color="main4" styles={{ textAlign: 'center' }}>
        {title}
      </Text>
      {pathname === link && <CheckIcon color="main4" />}
    </ItemWrapper>
  )

  if (link) {
    return <NextLink href={link}>{content}</NextLink>
  }

  return content
}
