import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { DropdownMenu } from '@/components/DropdownMenu'
import {
  selectAgentNameFilter,
  setAgentNameFilter,
} from '@/features/agents/store/agent-analytics'
import { useAgentNameFilter } from '@/features/agents/hooks/use-agentNameFilter'
import { StyledTrigger } from './AgentNameFilter.styled'

export const AgentNameFilter = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const agentNameFilter = select(selectAgentNameFilter, shallowEqual)
  const { agentsOptions, loadMoreAgents } = useAgentNameFilter()

  const handleOnChange = (value: string | number) => {
    dispatch(setAgentNameFilter(value as number))
  }

  return (
    <DropdownMenu
      maxHeight="350px"
      triggerElement={(isOpen) => (
        <StyledTrigger>
          {t('filter-agentName')}{' '}
          <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
        </StyledTrigger>
      )}
      selectedOptions={agentsOptions.filter((item) => agentNameFilter === item.value)}
      minWidth="210px"
      options={agentsOptions}
      onChange={(selectedEl) => handleOnChange(selectedEl[0].value)}
      onMenuScrollToBottom={loadMoreAgents}
    />
  )
}
