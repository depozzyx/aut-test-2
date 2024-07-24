import useTranslation from 'next-translate/useTranslation'
import { Tooltip } from '@peiko/components/Tooltip'
import { Text } from '@peiko/components/Text'
import { SmallInfoIcon } from '@peiko/components/icons/SmallInfoIcon'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { setSelectedAssignedCampaign } from '@/features/agents/store/agents'
import { TAssignedCampaign } from '@/api-rest/agents/types'
import { Trigger, Menu, MenuItem } from './CampaignsTooltip.styled'

interface ICampaignTooltipProps {
  campaigns: TAssignedCampaign[]
}

export const CampaignsTooltip = ({ campaigns }: ICampaignTooltipProps): JSX.Element => {
  const { t } = useTranslation('agents')
  const { dispatch } = useRedux()
  const { setModal } = useModals()

  const campaignsAmount = campaigns.length

  const handleOpenCampaignInfoModal = (campaign: TAssignedCampaign) => {
    dispatch(setSelectedAssignedCampaign(campaign))
    setModal({ modalName: MODAL_NAMES.CAMPAIGN_INFO, isOpen: true })
  }

  return (
    <Tooltip
      position="bottom center"
      trigger={
        <Trigger startAdornment={<SmallInfoIcon />} disabled={!campaignsAmount}>
          <Text variant="f8" color="base">
            {t('campaigns-amount', { campaignsAmount })}
          </Text>
        </Trigger>
      }
      renderMenu={() => (
        <Menu>
          {campaigns.map((campaign) => (
            <MenuItem
              key={campaign.id}
              onClick={() => handleOpenCampaignInfoModal(campaign)}
            >
              <Text variant="f10" color="base">
                {campaign.name}
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
