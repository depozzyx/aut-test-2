import React, { memo, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'

import {
  formatCreatedAt,
  formatDuration,
} from '@/features/campaigns/utils/formatCreateAt'

import { StopIcon } from '@peiko/components/icons/StopIcon'
import { Tooltip } from '@peiko/components/Tooltip'
import { SaveIcon } from '@peiko/components/icons/SaveIcon/SaveIcon'
import { LoaderIcon } from '@peiko/components/icons/Loader'
import { RotateContainer } from '@peiko/components/loaders/Loader/Loader.styles'
import { notificationActions } from '@/features/common/notifications/store'
import { BaseImage } from '@peiko/components/BaseImage'
import { InfoColumn } from '../../../../components/InfoColumn'
import {
  selectCallsList,
  selectIsLoading,
  selectCallsOrderBy,
  setCallsOrderBy,
  selectCallsOrder,
} from '../../store/calls'
import { LoudSpeakerIcon } from '../../../../components/icons/LoudSpeakerIcon'
import { CallOrderBy, TCDRList } from '../../../../api/rest/calls/types'
import { apiCalls } from '../../../../api/rest/calls'
import { getLeadStatuses, selectLeadStatuses } from '../../../leads/store/leads'

type TCallListRowKeys =
  | 'createdAt'
  | 'campaign'
  | 'agent'
  | 'name'
  | 'country'
  | 'phone'
  | 'duration'
  | 'onCallTime'
  | 'talkTime'
  | 'disposition'
  | 'status'
  | 'leadList'
  | 'play'
  | 'download'

const img = '/images/flags4x3/'

export const CDRListTable = memo((): JSX.Element => {
  const { t } = useTranslation('calls-list')
  const { select, dispatch } = useRedux()

  const { data, isLoading, orderBy, order } = select(
    createStructuredSelector({
      data: selectCallsList,
      isLoading: selectIsLoading,
      orderBy: selectCallsOrderBy,
      order: selectCallsOrder,
    }),
    shallowEqual,
  )

  const statuses = select(selectLeadStatuses)

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const [audioUrls, setAudioUrls] = useState<{ [key: string]: string }>({})
  const [loadingSound, setLoadingSound] = useState<
    { [key: string]: boolean } | undefined
  >()
  const handlePlay = (requestId: string) => {
    if (audioUrls[requestId]) {
      setAudioUrls({})
    } else {
      if (loadingSound) {
        return
      }
      setLoadingSound({ [requestId]: true })
      setAudioUrls({})
      // Otherwise, fetch the audio URL
      return apiCalls
        .cdrRecord(requestId)
        .then((url) => {
          setAudioUrls({ [requestId]: url })
        })
        .catch(() => {
          dispatch(
            notificationActions.setNotification({
              key: `notifications:cdr.recordNotFound`,
              status: 'error',
              values: {},
            }),
          )
        })
        .finally(() => {
          setLoadingSound(undefined)
        })
    }
  }

  const handleStop = (id: string) => {
    if (audioUrls[id]) {
      delete audioUrls[id]
      setAudioUrls({ ...audioUrls })
    }
  }
  const handleDownload = (cdrItem: TCDRList) => {
    apiCalls
      .cdrRecord(cdrItem.requestId)
      .then((url) => {
        const a = document.createElement('a')
        a.href = url
        const fileName = formatCreatedAt(cdrItem.createdAt, true, 'HH-mm-ss').replace(
          / /g,
          '_',
        )
        a.download = `audio_${fileName}.wav`
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
      .catch(() => {
        dispatch(
          notificationActions.setNotification({
            key: `notifications:cdr.recordNotFound`,
            status: 'error',
            values: {},
          }),
        )
      })
  }
  const headers: THeader<TCallListRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.createdAt')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.createdAt))}
          order={orderBy === CallOrderBy.createdAt ? order : undefined}
        />
      ),
      value: 'createdAt',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.campaign')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.campaign))}
          order={orderBy === CallOrderBy.campaign ? order : undefined}
        />
      ),
      value: 'campaign',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.leadList')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.leadList))}
          order={orderBy === CallOrderBy.leadList ? order : undefined}
        />
      ),
      value: 'leadList',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.user')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.user))}
          order={orderBy === CallOrderBy.user ? order : undefined}
        />
      ),
      value: 'agent',
    },
    {
      label: t('headers.list.name'),
      value: 'name',
    },
    {
      label: t('headers.list.country'),
      value: 'country',
    },
    {
      label: t('headers.list.phone'),
      value: 'phone',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.duration')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.duration))}
          order={orderBy === CallOrderBy.duration ? order : undefined}
        />
      ),
      value: 'duration',
    },
    { label: t('headers.list.onCallTime'), value: 'onCallTime' },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.talkTime')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.talkTime))}
          order={orderBy === CallOrderBy.talkTime ? order : undefined}
        />
      ),
      value: 'talkTime',
    },
    {
      label: t('headers.list.disposition'),
      value: 'disposition',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.status')}
          onClick={() => dispatch(setCallsOrderBy(CallOrderBy.status))}
          order={orderBy === CallOrderBy.status ? order : undefined}
        />
      ),
      value: 'status',
    },

    { label: t('headers.list.play'), value: 'play' },
    { label: t('headers.list.download'), value: 'download' },
  ]

  const rows = data.map((cdrItem: TCDRList) => ({
    row: {
      id: cdrItem.id,
      createdAt: (
        <InfoColumn
          title={
            cdrItem?.createdAt ? formatCreatedAt(cdrItem.createdAt, true, 'HH:mm:ss') : ''
          }
        />
      ),
      campaign: <InfoColumn title={cdrItem.campaign} />,
      agent: (
        <InfoColumn
          title={cdrItem.user ? `${cdrItem.user.username} (${cdrItem.user.pbxName})` : ''}
        />
      ),
      name: <InfoColumn title={cdrItem.lead?.name ?? ''} />,
      country: (
        <BaseImage
          src={`${img}${cdrItem.lead?.countryCode?.toLowerCase()}.svg`}
          alt={cdrItem.lead?.countryCode}
          width={24}
          height={24}
        />
      ),
      phone: <InfoColumn title={cdrItem.phone} />,
      disposition: <InfoColumn title={cdrItem.disposition} />,
      duration: <InfoColumn title={formatDuration(cdrItem.duration)} />,
      onCallTime: <InfoColumn title={formatDuration(cdrItem.onCallTime)} />,
      talkTime: <InfoColumn title={formatDuration(cdrItem.talkTime)} />,
      status: (
        <InfoColumn
          tooltipText={statuses.find((s) => s.value === cdrItem.status)?.name}
          title={cdrItem.status}
        />
      ),
      leadList: <InfoColumn title={cdrItem.leadList?.name ?? ''} />,
      play:
        cdrItem.talkTime > 0 ? (
          <>
            <Tooltip
              on={[]}
              open={Boolean(audioUrls[cdrItem.requestId])}
              padding="4px 8px"
              contentBackgroundColor="base"
              contentBorderColor="base"
              arrowBorderColor="base"
              position="bottom center"
              arrow={false}
              keepTooltipInside
              closeOnDocumentClick={false}
              trigger={
                <IconButton
                  onClick={() => handlePlay(cdrItem.requestId)}
                  iconColor="main3"
                  disabled={Boolean(loadingSound)}
                >
                  {(() => {
                    if (loadingSound?.[cdrItem.requestId]) {
                      return (
                        <RotateContainer isRotating>
                          <LoaderIcon />
                        </RotateContainer>
                      )
                    }
                    if (!audioUrls[cdrItem.requestId]) {
                      return <LoudSpeakerIcon width="24px" height="24px" />
                    }
                    return <StopIcon width="24px" height="24px" />
                  })()}
                </IconButton>
              }
              renderMenu={() => (
                <audio controls autoPlay src={audioUrls[cdrItem.requestId]}>
                  <track kind="captions" />
                  {t('Your browser does not support the audio element.')}
                </audio>
              )}
              onClose={() => handleStop(cdrItem.requestId)}
            />
          </>
        ) : null,
      download:
        cdrItem.talkTime > 0 ? (
          <IconButton onClick={() => handleDownload(cdrItem)} iconColor="main3">
            <SaveIcon width="24px" height="24px" />
          </IconButton>
        ) : null,
    },
  }))

  return (
    <>
      <Table
        minHeight={isLoading ? undefined : '300px'}
        loading={isLoading}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
        emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
      />
    </>
  )
}, deepEqual)

CDRListTable.displayName = 'CDRListTable'
