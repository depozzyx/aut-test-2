import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { useMount, useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { CallIcon } from '@/icons/CallIcon'
import { useRedux } from '@/hooks/use-redux'
import { apiCalls } from '@/api-rest/calls'
import { useAuth } from '@/features/common/user'
import {
  selectSelectedCampaignId,
  setSelectedCampaignId,
} from '@/features/agents/store/agents'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { apiCampaigns } from '@/api-rest/campaigns'
import { apiAgents } from '@/api-rest/agents'
import { palette } from '@peiko/styles/palette'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { getCountryName } from '@/features/campaigns/utils/getCountryByCode'
import { useStore } from 'react-redux'
import { TDispatch } from 'store'
import {
  asyncGetAgentAssignedCampaigns,
  selectAgentAssignedCampaigns,
  setAgentAssignedCampaigns,
} from '@/features/campaigns/store/campaigns'
import { formatDuration } from '@/utils/date-to-string'
import { CardTile } from '@/features/settings/components/CardTile'
import { TAgentDashboard } from '@/api-rest/agents/types'
import { isString } from 'formik'
// import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { ButtonWithTooltip } from '@/features/campaigns/containers/tables/CampaignListTable/ButtonWithTooltip'
import { notificationActions } from '@/features/common/notifications/store'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'
import { errorActions, handleRestError } from '../common/error'
import { socket } from '../../api/socket/Socket'
import { campaignSocket } from '../../api/socket/campaign'

const SelectAgentCampaignModal = dynamic(
  () =>
    import('./containers/modals/SelectAgentCampaignModal').then(
      (mod) => mod.SelectAgentCampaignModal,
    ),
  {
    ssr: false,
  },
)

const gridRepeatCount = (length: number) => {
  if (length <= 9) return 3
  if (length > 9) return 4
  if (length > 12) return 5
}

const SUBSCRIBE_CAMPAIGN_STATUS = 'Subscribe campaign status'

const getActiveCampaigns = async (dispatch: TDispatch) => {
  const response = await apiCampaigns.getAgentAssignedActiveCampaigns()
  const campaigns = response?.data?.data || []
  dispatch(setAgentAssignedCampaigns(campaigns))
  return campaigns
}

const getCurrentAgentDashboard = async (
  dispatch: TDispatch,
  setAgentDashboard: React.Dispatch<React.SetStateAction<TAgentDashboard | undefined>>,
) => {
  try {
    const response = await apiAgents.getAgentDashboard()
    setAgentDashboard(response?.data?.data)
  } catch (e) {
    handleRestError({ e, dispatch })
  }
}

const checkStatus = async (dispatch: TDispatch) => {
  const { data } = await apiAgents.getAgentStatus()
  dispatch(agentActions.setPBXStatus(data.data))
  if (data.data.status === 'online') {
    dispatch(agentActions.setStatusAsync('finish'))
    dispatch(setSelectedCampaignId(null))
  }
}

export const Calls: FC = () => {
  const { t } = useTranslation('calls')

  const { dispatch, select } = useRedux()
  const store = useStore()
  const { pbxStatus, checkCampaignId, sipCanConnect, hasCurrentRTCSession } =
    select(agentStatusSelector)
  const [callDuration, setCallDuration] = useState(0)
  const [hasCampaignSubscription, setHasCampaignSubscription] = useState(false)

  const {
    connect,
    keepAlive,
    disconnect,
    endCall,
    ua,
    lead,
    endedCall,
    setEndedCall,
    setLead,
  } = useSIPService()

  const { user } = useAuth()
  const { modalState, setModal } = useModals()
  const [campaignCompleted, setCampaignCompleted] = useState(false)

  const selectedCampaignId = select(selectSelectedCampaignId)
  const leadStatuses = select(selectLeadStatuses)
  const agentAssignedCampaigns = select(selectAgentAssignedCampaigns)

  const openModal = async () => {
    dispatch(asyncGetAgentAssignedCampaigns())
    setModal({ modalName: MODAL_NAMES.SELECT_AGENT_CAMPAIGN, isOpen: true })
  }

  const onUnsubscribeCampaignStatus = () => {
    setHasCampaignSubscription(false)
    socket.unsubscribe(SUBSCRIBE_CAMPAIGN_STATUS)
  }

  const checkIfAllCampaignsCompleted = async () => {
    const campaignsData = await getActiveCampaigns(dispatch)
    if (!campaignsData.length) {
      setCampaignCompleted(true)
    }
  }

  const onCompleteCampaign = () => {
    // eslint-disable-next-line no-console
    console.info('run oncomplete callback => set agent status [finish]')
    dispatch(agentActions.setStatusAsync('finish'))
    dispatch(agentActions.setSipCanConnect(false))
    disconnect()
    checkIfAllCampaignsCompleted()
    dispatch(setSelectedCampaignId(null))
  }

  const [completed, setCompleted] = useState(false)

  const onSubscribeCampaignStatus = (campaignId: string) => {
    if (hasCampaignSubscription) {
      onUnsubscribeCampaignStatus()
    }
    setHasCampaignSubscription(true)
    campaignSocket.campaignStatusUpdate(
      {
        id: SUBSCRIBE_CAMPAIGN_STATUS,
        callback: (e) => {
          if (e.status === 'complete' || e.status === 'pause') {
            const { status } = store.getState().agentStatus.pbxStatus
            // eslint-disable-next-line no-console
            console.info(`Received completed event, current Agent Status: ${status}`)
            dispatch(
              notificationActions.setNotification({
                key: `notifications:agent.campaign-${e.status}`,
                status: 'info',
                values: {},
              }),
            )
            if (status === 'pause') {
              // eslint-disable-next-line no-console
              console.info('set oncomplete callback')
              setCompleted(true)
            } else if (status !== 'offline') {
              onCompleteCampaign()
            }
            if (e.status === 'complete') onUnsubscribeCampaignStatus()
          }
        },
      },
      campaignId,
    )
  }

  // // connect to sip
  useEffect(() => {
    if (sipCanConnect && !hasCurrentRTCSession && !ua?.isConnected()) {
      // eslint-disable-next-line no-console
      console.info(`CONNECTING ... [${pbxStatus.status}]`)
      connect()
      keepAlive()
      // setTimeout(() => {
      //   // eslint-disable-next-line no-console
      //   console.info('TIMER')
      //   dispatch(agentActions.setStatusAsync('start'))
      // }, 500)
    }
  }, [ua, hasCurrentRTCSession, sipCanConnect])

  useMount(() => {
    // eslint-disable-next-line no-console
    console.debug('on mount isConnected: ', ua?.isConnected())
    dispatch(getLeadStatuses())
    checkStatus(dispatch)
  })
  useUnmount(() => {
    // eslint-disable-next-line no-console
    console.debug('disconnect on unmount')
    // if (['offline', 'finish', 'pause'].includes(pbxStatus.status)) {
    //   disconnect()
    // }
    onUnsubscribeCampaignStatus()
    dispatch(agentActions.setSipCanConnect(false))
    if (selectedCampaignId) {
      dispatch(setSelectedCampaignId(null))
    }
  })

  const [onSelectedCampaign, setOnSelectedCampaign] = useState(true)

  // set agent working campaign
  const setCampaignId = async (createCallback?: boolean): Promise<number | null> => {
    if (user?.role === 'agent' && !selectedCampaignId) {
      if (createCallback) {
        setOnSelectedCampaign(true)
      }
      const campaignsData = await getActiveCampaigns(dispatch)
      // setCampaigns([])
      if (campaignsData.length) {
        if (campaignsData.length === 1) {
          const campaignId = campaignsData[0].id
          if (campaignId) {
            dispatch(setSelectedCampaignId(String(campaignId)))
            onSubscribeCampaignStatus(String(campaignId))
            return campaignId
          }
        } else {
          openModal()
        }
      } else {
        openModal()
      }
    }
    return null
  }

  useEffect(() => {
    if (checkCampaignId) {
      dispatch(agentActions.setCheckCampaignId(false))
      setCampaignId(true).then((id) => {
        if (id) {
          // eslint-disable-next-line no-console
          console.info('checkCampaignId with callback to -> start')
          if (pbxStatus.status !== 'online') {
            dispatch(agentActions.setSipCanConnect(true))
            // eslint-disable-next-line no-console
            console.info('callback to -> start')
            dispatch(agentActions.setStatusAsync('start'))
          }
          onSubscribeCampaignStatus(String(id))
        }
      })
    }
  }, [checkCampaignId])

  const resetAllData = async () => {
    setCallDuration(0)
    setEndedCall(false)
    setLead(null)
  }

  const onCallFeedback = async (status: string) => {
    try {
      if (!lead) return
      const holdTimeSec = lead?.campaign?.holdTime
      await apiCalls.feedback({
        status,
        requestId: lead.requestId,
      })
      await resetAllData()
      if (holdTimeSec || holdTimeSec === 0) {
        dispatch(agentActions.setStatusAsync('pause', 'hold'))
        // un hold after timeout
        setTimeout(() => {
          const { status } = store.getState().agentStatus.pbxStatus
          if (completed) {
            onCompleteCampaign()
            setCompleted(false)
          } else {
            // eslint-disable-next-line no-console
            console.debug(`campaign is not completed yet ${status} => unpause`)
            dispatch(agentActions.setStatusAsync('unpause'))
          }
        }, holdTimeSec * 1000)
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  // reset all on call ends
  useEffect(() => {
    if (['online'].includes(pbxStatus.status) && endedCall) {
      resetAllData()
    }
  }, [pbxStatus.status])

  const [agentDashboard, setAgentDashboard] = useState<TAgentDashboard>()

  // set campaign id on selected
  useEffect(() => {
    setCampaignId()
  }, [selectedCampaignId])

  const showModal =
    modalState?.modalName === MODAL_NAMES.SELECT_AGENT_CAMPAIGN &&
    modalState.isOpen &&
    !['oncall', 'ringing', 'pause'].includes(pbxStatus.status)

  const handleChangeCampaign = async () => {
    if (pbxStatus.status !== 'offline') {
      dispatch(
        errorActions.showGlobalError(
          "You can't change the campaign right now. Please switch it to offline mode first.",
        ),
      )
    } else {
      await openModal()
    }
  }

  // get agent dashboard data
  useEffect(() => {
    getCurrentAgentDashboard(dispatch, setAgentDashboard)
  }, [selectedCampaignId])
  const getTimeOnline = (agent: TAgentDashboard) => {
    const loggedTime = isString(agent.timeOnline)
      ? parseFloat(agent.timeOnline)
      : agent.timeOnline
    const ongoingTime = isString(agent.ongoingTime)
      ? parseFloat(agent.ongoingTime)
      : agent.ongoingTime
    const seconds = Math.ceil(loggedTime + ongoingTime)
    return seconds >= 0 ? formatDuration(seconds) : ''
  }
  const reFetchTimeout = 5000
  useEffect(() => {
    if (reFetchTimeout) {
      const interval = setInterval(() => {
        getCurrentAgentDashboard(dispatch, setAgentDashboard)
      }, reFetchTimeout)

      return () => clearInterval(interval)
    }
  }, [reFetchTimeout, dispatch])

  const showSelectedCampaignName = (): string => {
    let result = '-'
    if (selectedCampaignId && !agentDashboard?.currentCampaignName) {
      const found = agentAssignedCampaigns.find((c) => c.id === +selectedCampaignId)
      if (found) {
        result = found.name
      }
    } else if (agentDashboard?.currentCampaignName) {
      result = agentDashboard.currentCampaignName
    }
    return result
  }

  return (
    <>
      <Card fullWidth styles={{ marginTop: '40px', padding: '24px' }}>
        <CardTile>{t('agents.dashboard.title')}</CardTile>
        <Flex
          justify="space-between"
          align="start"
          styles={{ marginTop: '24px', flexWrap: 'wrap', gap: '24px' }}
        >
          <div
            style={{
              minWidth: '150px',
            }}
          >
            <Text color="main22"> {t('agents.dashboard.current-campaign')}</Text>
            <Flex align="start" justify="start" gap="8px">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Text variant="f4">{showSelectedCampaignName()}</Text>
                {!agentDashboard?.currentCampaignName && selectedCampaignId && (
                  <Text variant="f10" color="main22">
                    {t('agents.dashboard.not-online')}
                  </Text>
                )}
              </div>
              <div />
              <ButtonWithTooltip
                showTooltip={!agentDashboard?.currentCampaignName}
                // buttonDisabled={campaign.status === CAMPAIGN_STATUSES.ACTIVE}
                onClick={handleChangeCampaign}
                tooltipText="Change selected campaign"
                iconType="info"
                buttonType="edit"
              />
            </Flex>
            {/* <FilledButton onClick={handleChangeCampaign}> */}
            {/*  <div style={{ fontSize: '18px', fontWeight: '600' }}> */}
            {/*    {(selectedCampaignId && agentDashboard?.currentCampaignName) || */}
            {/*      'click to select campaign'} */}
            {/*  </div> */}
            {/* </FilledButton> */}
          </div>
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
              {t('agents.dashboard.time-online')}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {agentDashboard?.timeOnline || agentDashboard?.ongoingTime
                ? getTimeOnline(agentDashboard)
                : '0s'}
            </div>
          </div>

          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
              {t('agents.dashboard.calls-handled')}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {agentDashboard?.callsHandled ?? 0}
            </div>
          </div>
        </Flex>
      </Card>

      <Flex justify="center" align="center" styles={{ flex: 1 }}>
        {lead?.requestId &&
          endedCall &&
          pbxStatus.status === 'pause' &&
          pbxStatus.reason === 'feedback' && (
            <Card
              padding="32px 60px"
              fullWidth
              styles={{ textAlign: 'center' }}
              maxWidth="max-content"
            >
              <Text variant="f2">{t('feedback')}</Text>
              <Flex
                justify="center"
                direction="row"
                styles={{ marginTop: '24px', marginBottom: '24px' }}
              >
                <Flex align="start" direction="column">
                  <Text>
                    {`${t('lead')}: `} {lead.lead.name}
                  </Text>
                  <Text>
                    {`${t('country')}: `} {getCountryName(lead.leadCountryCode)}
                  </Text>
                </Flex>
              </Flex>
              <Flex justify="center">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridRepeatCount(
                      leadStatuses.length,
                    )}, 1fr)`,
                    gridRowGap: '24px',
                    gridColumnGap: '32px',
                  }}
                >
                  {leadStatuses
                    .filter((status) => !status.feedbackDisabled)
                    .map(({ name, value }) => (
                      <div key={value}>
                        <Text
                          styles={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            padding: '6px',
                            border: '1px solid',
                            borderColor: palette.overlay,
                            borderRadius: '4px',
                            width: '100px',
                            height: '55px',
                            ':hover': {
                              borderColor: palette.main21,
                            },
                          }}
                          variant="f8"
                          onClick={() => onCallFeedback(value)}
                        >
                          {name}
                        </Text>
                      </div>
                    ))}
                </div>
              </Flex>
            </Card>
          )}
        {!(pbxStatus.status === 'oncall') && !lead && !endedCall && !callDuration && (
          <Text styles={{ textAlign: 'center' }} variant="f4">
            {t('noCalls')}
          </Text>
        )}
        {pbxStatus.status === 'oncall' && (
          <Card padding="32px 68px" fullWidth maxWidth={582}>
            <Text styles={{ textAlign: 'center', marginBottom: '40px' }} variant="f2">
              {t('newCall')}
            </Text>
            <Flex direction="column" align="center" gap="48px">
              <CallWindow
                endedCall={endedCall}
                setDuration={(duration) => setCallDuration(duration)}
                callData={lead || undefined}
                leadStatuses={leadStatuses}
              />
              <CallButton onClick={() => endCall(true)} isLoading={endedCall}>
                <CallIcon />
              </CallButton>
            </Flex>
          </Card>
        )}
      </Flex>
      {showModal &&
        (agentAssignedCampaigns.length > 1 || agentAssignedCampaigns.length === 0) && (
          <SelectAgentCampaignModal
            // campaigns={campaigns}
            onSelectedCampaign={onSelectedCampaign}
            onSelectCampaign={onSubscribeCampaignStatus}
            callback={(id: string | undefined) => {
              if (id) {
                // dispatch(agentActions.setSipCanConnect(true))
                // dispatch(agentActions.setStatusAsync('start'))
                setOnSelectedCampaign(false)
                // onSubscribeCampaignStatus(id) // cause already subscribed in modal submit
              }
            }}
            // campaignCompleted={campaignCompleted}
            onClose={() => campaignCompleted && setCampaignCompleted(false)}
          />
        )}
    </>
  )
}
