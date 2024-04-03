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
      padding="8px 20px"
      direction="column"
      align="center"
      justify="center"
      cursor="pointer"
      onClick={onClick}
      isSelected={pathname === link}
    >
      <SidebarItemIcon />
      <Text variant="f10" color="base">
        {title}
      </Text>
    </ItemWrapper>
  )

  if (link) {
    return <NextLink href={link}>{content}</NextLink>
  }

  return content
}
