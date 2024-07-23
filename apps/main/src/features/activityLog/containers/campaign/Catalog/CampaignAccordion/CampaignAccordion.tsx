import { useTheme } from 'styled-components'
import { useRedux } from '@/hooks/use-redux'
import { FilledAccordion } from '@peiko/components/accordions/FilledAccordion'
import { CampaignAccordionHeader } from './components/CampaignAccordionHeader'
import { CampaignAccordionContent } from './components/CampaignAccordionContent'
import { updateParams } from '../../../../store/campaign-log'

type TProps = {
  campaignName: string
  campaignId: number
  isOpen: boolean
  onToggle: (campaignId: number) => void
}

export const CampaignAccordion = ({
  campaignName,
  campaignId,
  isOpen,
  onToggle,
}: TProps): JSX.Element => {
  const theme = useTheme()
  const { dispatch } = useRedux()

  const handleGetCampaignLogInfo = (campaignId: number) => {
    dispatch(
      updateParams({
        campaignId,
      }),
    )
  }

  return (
    <FilledAccordion
      isOpen={isOpen}
      header={({ isOpen }) => (
        <CampaignAccordionHeader isOpen={isOpen} campaignName={campaignName} />
      )}
      onOpen={({ isOpen }) => {
        if (!isOpen) {
          handleGetCampaignLogInfo(campaignId)
        }
        onToggle(campaignId)
      }}
      containerStyles={({ isOpen }) => ({
        width: '100%',
        backgroundColor: isOpen ? theme.palette.overlay : theme.palette.base3,
        padding: isOpen ? '0 0 10px 0' : '0',
      })}
      headerStyles={{ height: '48px', display: 'flex', padding: '6px 10px' }}
      collapseStyles={{
        padding: '0 10px',
      }}
    >
      <CampaignAccordionContent campaignId={campaignId} />
    </FilledAccordion>
  )
}
