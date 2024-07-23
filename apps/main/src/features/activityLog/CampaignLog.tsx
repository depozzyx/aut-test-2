import { useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { ActivityTabs } from '@/features/activityLog/containers/ActivityTabs'
import { CampaignCatalog } from './containers/campaign/Catalog'
import { resetCampaignLog } from './store/campaign-log'
import {
  Container,
  CampaignsAside,
  LogSection,
  Content,
} from './styles/CampaignLog.styled'
import { Logs } from './containers/campaign/Logs'

export const CampaignLog = (): JSX.Element => {
  const { dispatch } = useRedux()

  useUnmount(() => {
    dispatch(resetCampaignLog())
  })

  return (
    <Container>
      <ActivityTabs />
      <Content>
        <CampaignsAside>
          <CampaignCatalog />
        </CampaignsAside>
        <LogSection>
          <Logs />
        </LogSection>
      </Content>
    </Container>
  )
}
