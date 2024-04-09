import { useRouter } from 'next/router'
import { SidebarItemIcon } from '@peiko/components/icons/SidebarItemIcon'
import { NextLink } from '@peiko/components/links/NextLink'
import { Text } from '@peiko/components/Text'
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
      height={74}
      padding="8px 11px"
      direction="column"
      align="center"
      justify="center"
      cursor="pointer"
      gap={3}
      onClick={onClick}
      isSelected={pathname === link}
    >
      <SidebarItemIcon />
      <Text variant="f10" color="base" styles={{ textAlign: 'center' }}>
        {title}
      </Text>
    </ItemWrapper>
  )

  if (link) {
    return <NextLink href={link}>{content}</NextLink>
  }

  return content
}
