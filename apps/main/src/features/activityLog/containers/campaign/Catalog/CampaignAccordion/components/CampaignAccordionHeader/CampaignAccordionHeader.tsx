import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { Text } from '@peiko/components/Text'
import { Wrapper } from './CampaignAccordionHeader.styled'

type TProps = {
  isOpen: boolean
  campaignName: string
}

export const CampaignAccordionHeader = ({
  isOpen,
  campaignName,
}: TProps): JSX.Element => (
  <Wrapper>
    <Text variant="f8">{campaignName}</Text>
    <ArrowIcon
      direction={isOpen ? 'up' : 'down'}
      color={isOpen ? 'main2' : 'main5'}
      width="18px"
      height="18px"
    />
  </Wrapper>
)
