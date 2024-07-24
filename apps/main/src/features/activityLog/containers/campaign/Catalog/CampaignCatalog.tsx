import { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Box } from '@peiko/components/Box'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncGetCampaignsList,
  selectCampaignsList,
} from '@/features/campaigns/store/campaigns'
import { Pagination } from '@peiko/components/Pagination'
import { useCampaignsManager } from '@/features/campaigns/hooks/use-campaignsManager'
import { CatalogPanel } from './CatalogPanel'
import { CatalogWrapper, PaginationContainer } from './CampaignCatalog.styled'
import { CampaignAccordion } from './CampaignAccordion'

export const CampaignCatalog = (): JSX.Element => {
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null)
  const { select } = useRedux()
  const {
    handleChangePage,
    pagination: { page, total, limit },
  } = useCampaignsManager(asyncGetCampaignsList)

  const campaignsList = select(selectCampaignsList, shallowEqual)

  const handleAccordionToggle = (campaignId: number) => {
    setOpenAccordionId((prevId) => (prevId === campaignId ? null : campaignId))
  }

  return (
    <Box styles={{ width: '100%' }}>
      <CatalogPanel />
      <CatalogWrapper>
        {campaignsList.map((campaign) => (
          <CampaignAccordion
            key={campaign.id}
            campaignName={campaign.name}
            campaignId={campaign.id}
            isOpen={openAccordionId === campaign.id}
            onToggle={handleAccordionToggle}
          />
        ))}
      </CatalogWrapper>
      <PaginationContainer>
        <Pagination
          size="s"
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
          currentPage={page}
          onChange={handleChangePage}
        />
      </PaginationContainer>
    </Box>
  )
}
