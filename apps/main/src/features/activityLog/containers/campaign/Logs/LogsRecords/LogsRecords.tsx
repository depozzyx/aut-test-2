import { format } from 'date-fns'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Loader } from '@peiko/components/loaders/Loader'
import { Text } from '@peiko/components/Text'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { DetailsLogModal } from '@/features/activityLog/containers/campaign/Logs/DetailsLogModal'
import { TDetails } from '@/api-rest/campaign-log/types'
import Trans from 'next-translate/Trans'
import { selectLogsData, setCurrentLogDetails } from '../../../../store/campaign-log'
import { DetailsText } from './LogsRecords.styled'
import { getCampaignLogValues } from '../../../../utils/getCampaignLogValues'

type TProps = {
  isLoading: boolean
}

export const LogsRecords = ({ isLoading }: TProps): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { dispatch, select } = useRedux()
  const { setModal } = useModals()
  const logs = select(selectLogsData, shallowEqual)

  const handleOnDetailsClick = (details: TDetails) => {
    dispatch(setCurrentLogDetails(details))
    setModal({ modalName: MODAL_NAMES.CAMPAIGN_DETAILS_LOG, isOpen: true })
  }

  return (
    <>
      <Flex fullWidth direction="column" gap="8px" styles={{ minHeight: '500px' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {logs.length === 0 && (
              <Text variant="f8" color="main4">
                {t('noLogs')}
              </Text>
            )}
            {logs.map(({ createdDay, data }) => (
              <Card
                key={createdDay}
                padding="4px 16px 4px 72px"
                styles={{
                  position: 'relative',
                  minHeight: '86px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                fullWidth
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  width="70px"
                  height="81px"
                  styles={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Text variant="f10" color="main5">
                    {format(new Date(createdDay), 'EEE').toUpperCase()}
                  </Text>
                  <Text variant="f6" styles={{ lineHeight: '28px' }} color="main5">
                    {format(new Date(createdDay), 'dd')}
                  </Text>
                  <Text variant="f10" color="main5">
                    {format(new Date(createdDay), 'MMM')}
                  </Text>
                </Flex>
                <Flex direction="column" gap="18px" styles={{ flex: '1' }}>
                  {data.map((log) => (
                    <Flex key={log.id} fullWidth justify="space-between" align="center">
                      <Flex gap={12} align="center">
                        <Trans
                          i18nKey={`activity-log:campaign.logs.actionType.${log.actionType}`}
                          components={{
                            value: (
                              <Text
                                tag="span"
                                variant="f8"
                                color="main5"
                                styles={{ fontWeight: 'bold' }}
                              />
                            ),
                            base: <Text tag="span" variant="f8" color="main5" />,
                          }}
                          values={getCampaignLogValues(log)}
                          defaultTrans="<base>Unknown message</base>"
                        />
                        {log.pbxStatistics && (
                          <DetailsText
                            variant="f10"
                            color="main5"
                            onClick={() =>
                              handleOnDetailsClick(log.pbxStatistics as TDetails)
                            }
                          >
                            {t('campaign.logs.details')}
                          </DetailsText>
                        )}
                      </Flex>
                      <Text variant="f10" color="main22">
                        {format(new Date(log.createdAt), 'HH:mm aa')}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Card>
            ))}
          </>
        )}
      </Flex>
      <DetailsLogModal />
    </>
  )
}
