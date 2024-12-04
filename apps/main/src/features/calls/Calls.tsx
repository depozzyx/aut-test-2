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
import { TCallStatuses } from '@/api-rest/calls/types'
import { useAuth } from '@/features/common/user'
import {
  selectSelectedCampaignId,
  setSelectedCampaignId,
} from '@/features/agents/store/agents'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TCampaign } from '@/features/campaigns/types'
import { apiAgents } from '@/api-rest/agents'
import { palette } from '@peiko/styles/palette'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'
import { handleRestError } from '../common/error'
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

export const Calls: FC = () => {
  const { t } = useTranslation('calls')

  const { dispatch, select } = useRedux()
  const { pbxStatus, checkCampaignId } = select(agentStatusSelector)
  const [callDuration, setCallDuration] = useState(0)
  const { connect, disconnect, ua, endCall, lead, endedCall, setEndedCall, setLead } =
    useSIPService()
  const { user } = useAuth()
  const { modalState, setModal } = useModals()
  const [campaignCompleted, setCampaignCompleted] = useState(false)

  const selectedCampaignId = select(selectSelectedCampaignId)

  const SUBSCRIBE_CAMPAIGN_STATUS = 'Subscribe campaign status'

  const getActiveCampaigns = async () => {
    const response = await apiCampaigns.getAgentAssignedActiveCampaigns()
    return response?.data?.data
  }

  const onUnsubscribeCampaignStatus = () => {
    socket.unsubscribe(SUBSCRIBE_CAMPAIGN_STATUS)
  }

  const checkIfAllCampaignsCompleted = async () => {
    const campaignsData = await getActiveCampaigns()
    if (!campaignsData.length) {
      setCampaignCompleted(true)
    }
  }
  const onSubscribeCampaignStatus = (campaignId: string) => {
    campaignSocket.campaignStatusUpdate(
      {
        id: SUBSCRIBE_CAMPAIGN_STATUS,
        callback: (e) => {
          if (e.status === 'complete') {
            dispatch(agentActions.setStatusAsync('finish'))
            checkIfAllCampaignsCompleted()
            dispatch(setSelectedCampaignId(null))
            onUnsubscribeCampaignStatus()
          }
        },
      },
      campaignId,
    )
  }

  useEffect(() => {
    if (ua && !ua?.isConnected()) {
      connect()
    }
  }, [ua])

  useMount(() => {
    const checkStatus = async () => {
      const { data } = await apiAgents.getAgentStatus({})
      dispatch(agentActions.setPBXStatus(data.data))
      if (data.data === 'online') {
        dispatch(agentActions.setStatusAsync('finish'))
      }
    }
    checkStatus()
  })

  useUnmount(() => {
    if (['offline', 'finish', 'pause', 'manual_pause'].includes(pbxStatus)) {
      disconnect()
    }
    onUnsubscribeCampaignStatus()
  })

  const [campaigns, setCampaigns] = useState<Partial<TCampaign>[]>([])
  const [onSelectedCampaign, setOnSelectedCampaign] = useState(true)

  const openModal = () => {
    setModal({ modalName: MODAL_NAMES.SELECT_AGENT_CAMPAIGN, isOpen: true })
  }

  const setCampaignId = async (createCallback?: boolean): Promise<number | null> => {
    if (user?.role === 'agent' && !selectedCampaignId) {
      if (createCallback) {
        setOnSelectedCampaign(true)
      }
      const campaignsData = await getActiveCampaigns()
      setCampaigns([])
      if (campaignsData.length) {
        setCampaigns(campaignsData)
        if (campaignsData.length === 1) {
          const campaignId = campaignsData[0].id
          if (campaignId) {
            dispatch(setSelectedCampaignId(String(campaignId)))
            // dispatch(agentActions.setStatusAsync('start'))
            onSubscribeCampaignStatus(String(campaignId))
            return campaignId
          }
        } else {
          openModal()
        }
      } else {
        setCampaigns([])
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
          dispatch(agentActions.setStatusAsync('start'))
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

  const onCallFeedback = async (status: TCallStatuses) => {
    try {
      if (!lead) return
      await apiCalls.feedback({
        status,
        requestId: lead.requestId,
      })
      await resetAllData()
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  useEffect(() => {
    if (['online'].includes(pbxStatus) && endedCall) {
      resetAllData()
    }
  }, [pbxStatus])

  useEffect(() => {
    setCampaignId()
  }, [selectedCampaignId])

  const showModal =
    modalState?.modalName === MODAL_NAMES.SELECT_AGENT_CAMPAIGN &&
    modalState.isOpen &&
    !['oncall', 'ringing'].includes(pbxStatus)

  return (
    <>
      <Flex justify="center" align="center" styles={{ flex: 1 }}>
        {lead?.requestId && endedCall && pbxStatus === 'system_pause' && (
          <Card
            padding="32px 60px"
            maxWidth="440px"
            fullWidth
            styles={{ textAlign: 'center' }}
          >
            <Text variant="f2">{t('newCall')}</Text>
            <Flex justify="center" styles={{ marginTop: '48px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridRowGap: '24px',
                  gridColumnGap: '32px',
                }}
              >
                {['A', 'DEAD', 'CALLBK', 'DNCL', 'DNCG', 'NI'].map((key: string) => (
                  <div key={key}>
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
                      onClick={() => onCallFeedback(key as TCallStatuses)}
                    >
                      {t(`feedBackStatuses.${key}`)}
                    </Text>
                  </div>
                ))}
              </div>
            </Flex>
          </Card>
        )}
        {!(pbxStatus === 'oncall') && !lead && !endedCall && !callDuration && (
          <Text styles={{ textAlign: 'center' }} variant="f4">
            {t('noCalls')}
          </Text>
        )}
        {pbxStatus === 'oncall' && lead && (
          <Card padding="32px 68px" fullWidth maxWidth={582}>
            <Text styles={{ textAlign: 'center', marginBottom: '40px' }} variant="f2">
              {t('newCall')}
            </Text>
            <Flex direction="column" align="center" gap="48px">
              <CallWindow
                endedCall={endedCall}
                setDuration={(duration) => setCallDuration(duration)}
                callData={lead}
              />
              <CallButton onClick={() => endCall(true)} isLoading={endedCall}>
                <CallIcon />
              </CallButton>
            </Flex>
          </Card>
        )}
      </Flex>
      {showModal && (campaigns.length > 1 || campaigns.length === 0) && (
        <SelectAgentCampaignModal
          campaigns={campaigns}
          onSelectedCampaign={onSelectedCampaign}
          callback={(id: string | undefined) => {
            if (id) {
              dispatch(agentActions.setStatusAsync('start'))
              setOnSelectedCampaign(false)
              onSubscribeCampaignStatus(id)
            }
          }}
          campaignCompleted={campaignCompleted}
          onClose={() => campaignCompleted && setCampaignCompleted(false)}
        />
      )}
    </>
  )
}
