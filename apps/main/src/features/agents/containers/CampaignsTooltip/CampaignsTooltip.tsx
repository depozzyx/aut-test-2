import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Tooltip } from '@peiko/components/Tooltip'
import { Text } from '@peiko/components/Text'
import { SmallInfoIcon } from '@peiko/components/icons/SmallInfoIcon'
import { Trigger, Menu, MenuItem } from './CampaignsTooltip.styled'

interface ICampaignTooltipProps {
  campaigns: string[]
}

export const CampaignsTooltip = ({ campaigns }: ICampaignTooltipProps): JSX.Element => {
  const { t } = useTranslation('agents')
  const [isOpen, setIsOpen] = useState(false)

  const campaignsAmount = campaigns.length

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <Tooltip
      open={isOpen}
      position="bottom center"
      trigger={
        <Trigger onClick={handleOpen} startAdornment={<SmallInfoIcon />}>
          <Text variant="f8" color="base">
            {t('campaigns-amount', { campaignsAmount })}
          </Text>
        </Trigger>
      }
      renderMenu={() => (
        <Menu>
          {campaigns.map((campaign) => (
            <MenuItem key={campaign}>
              <Text variant="f10" color="base">
                {campaign}
              </Text>
            </MenuItem>
          ))}
        </Menu>
      )}
      offsetY={8}
      closeOnDocumentClick
      contentBackgroundColor="main3"
      arrowColor="main3"
      contenBorderColor="main3"
      arrow
    />
  )
}
