import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { UserWithMicro } from '@peiko/components/icons/UserWithMicro'
import useTranslation from 'next-translate/useTranslation'
import React, { useState, useEffect, useMemo } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { HeadphonesIcon } from '../../../components/icons/HeadphonesIcon'
import { MODAL_NAMES } from '../../../features/common/modals/constants'
import { WhisperSpyModal } from '../../../features/agents/containers/modals/WhisperSpyModal/WhisperSpyModal'
import { leadsApi } from '../../../api/rest/leads'
import { TLeadData } from '../../../api/rest/leads/types'
import {
  agentActions,
  agentStatusSelector,
} from '../../../features/common/agentStatus/store'
import { handleRestError } from '../../../features/common/error'
import { notificationActions } from '../../../features/common/notifications/store'
import { useModals } from '../../../features/common/modals/hooks/use-modals'
import { useRedux } from '../../../hooks/use-redux'
import { PhoneIcon } from '../../../components/icons/PhoneIcon'

interface PhoneChipProps {
  whisperTo: (exten: string) => void
  spyTo: (exten: string) => void
  disconnectSip: () => void
  hangupSip: () => void
}

const PhoneChipComponent = ({
  whisperTo,
  spyTo,
  disconnectSip,
  hangupSip,
}: PhoneChipProps): JSX.Element => {
  const { t } = useTranslation('agents')
  const { dispatch, select } = useRedux()

  const { setModal, modalState } = useModals()

  const [whisperLeadData, setWhisperLeadData] = useState<TLeadData>()
  const { whisperSpy, whisperSpyLeadId } = select(agentStatusSelector)

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  })
  const formatData = (value: number) => value.toString().padStart(2, '0')

  const callTime = `${formatData(hours)}:${formatData(minutes)}:${formatData(seconds)}`

  const fetchLead = (leadId: number) => {
    if (leadId) {
      leadsApi
        .getLead(leadId)
        .then((res) => {
          if (res?.data?.data) setWhisperLeadData(res.data.data)
        })
        .catch((e) => handleRestError({ e, dispatch }))
    }
  }

  const handleWhisperSpy = async () => {
    if (!whisperSpy) {
      disconnectSip()
      setWhisperLeadData(undefined)
      if (modalState?.modalName === MODAL_NAMES.WHISPER_SPY && modalState.isOpen) {
        setModal({ modalName: MODAL_NAMES.WHISPER_SPY, isOpen: false })
      }

      return
    }

    const { mode, exten } = whisperSpy
    try {
      if (mode === 'whisper') {
        whisperTo(exten || '')
      } else {
        spyTo(exten || '')
      }
      reset(undefined, false)
      start()
    } catch (e) {
      console.error(`[SIP] Failed to start ${mode} for ${exten}`, e)
      dispatch(agentActions.setWhisperSpy(undefined))
      dispatch(
        notificationActions.setNotification({
          key: t('whisper-spy.errors.start-whisper-spy', { agent: exten }),
          status: 'error',
          values: {},
        }),
      )
      return
    }
    setModal({ modalName: MODAL_NAMES.WHISPER_SPY, isOpen: true })
  }

  useEffect(() => {
    if (!whisperSpyLeadId) {
      setWhisperLeadData(undefined)
      return
    }
    fetchLead(whisperSpyLeadId)
  }, [whisperSpyLeadId])

  function hangupCall() {
    dispatch(agentActions.setWhisperSpy(undefined))
    pause()
    reset(undefined, false)
    hangupSip()
  }

  useEffect(() => {
    handleWhisperSpy()
  }, [whisperSpy])

  const icon = useMemo(() => {
    if (whisperSpy?.mode === 'spy') {
      return <HeadphonesIcon color="main11" />
    }
    if (whisperSpy?.mode === 'whisper') {
      return <UserWithMicro color="main11" />
    }
    return <PhoneIcon color="main11" />
  }, [whisperSpy])

  return (
    <>
      <OutlinedButton
        disabled={!whisperSpy}
        startIcon={icon}
        styles={{
          color: whisperSpy ? 'main' : 'main11',
          fontWeight: 500,
          height: '36px',
          fontSize: '14px',
          borderRadius: '18px',
          border: '2px solid',
          borderColor: (t) => t.palette.main2,
          backgroundColor: whisperSpy ? 'main11' : 'main11',
        }}
        onClick={() =>
          setModal({
            modalName: MODAL_NAMES.WHISPER_SPY,
            isOpen: !!whisperSpy,
          })
        }
      >
        {whisperSpy?.mode ? `${whisperSpy.exten} ${callTime}` : ''}
      </OutlinedButton>
      <WhisperSpyModal
        mode={whisperSpy?.mode || 'spy'}
        agentName={whisperSpy?.agentName || ''}
        agentExten={whisperSpy?.exten || ''}
        leadData={whisperLeadData}
        onHangup={() => {
          hangupCall()
        }}
      />
    </>
  )
}

export const PhoneChip = React.memo(PhoneChipComponent)
