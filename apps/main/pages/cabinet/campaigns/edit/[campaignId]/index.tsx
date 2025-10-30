import { NextPage } from 'next'
import { useTitle } from 'react-use'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { Container } from '@/features/campaigns/styles/CampaignsList.styled'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { useTheme } from 'styled-components'
import { InlineLoader } from '@peiko/components/loaders/InlineLoader'
import { ArrowIcon } from '@peiko/components/icons/Arrow/ArrowIcon'

import { ROUTES } from '@/routes'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { ActivityIcon } from '@/components/icons/ActivityIcon'
import { TTabsProps } from '@/components/Tabs'
import { RefreshIcon } from '@peiko/components/icons/Refresh/RefreshIcon'
import { SettingsIcon } from '@peiko/components/icons/SettingsIcon'
import { LeadsIcon } from '@/components/icons/LeadsIcon'
import {
  CampaignEditTabs,
  TCampaignEditTab,
} from '@/features/campaigns/components/EditPage/CampaignEditTabs'
import { CampaignGeneralPage } from '@/features/campaigns/components/EditPage/CampaignGeneralPage'
import { CampaignLeadsPage } from '@/features/campaigns/components/EditPage/CampaignLeadsPage'
import { CampaignRoutesPage } from '@/features/campaigns/components/EditPage/CampaignRoutesPage'
import { CampaignRecyclePage } from '@/features/campaigns/components/EditPage/RecycleRulesPage'
import { useCampaignEdit } from '@/features/campaigns/hooks/useCampaignEdit'
import { apiRoutes } from '@/api-rest/routes'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { QuestionModal } from '@/features/common/QuestionModal'

const CampaignEditPage: NextPage = () => {
  const { t } = useTranslation('campaign-edit')
  const { t: tRouting } = useTranslation('routing')

  const router = useRouter()
  const theme = useTheme()
  const { setModal, resetModals } = useModals()

  useTitle(tRouting('campaign_edit'))

  const campaignId = Number(router.query.campaignId)
  const [activeTab, setActiveTab] = useState<TCampaignEditTab>('general')
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const allowNavRef = useRef<boolean>(false)

  const { isLoading, campaign, formik, isChanged, resetFormikData, isValid, submitForm } =
    useCampaignEdit({
      campaignId,
    })

  const [tabs, setTabs] = useState<TTabsProps['tabs']>([
    {
      label: t('tabs.general'),
      value: 'general',
      icon: (color) => <ActivityIcon color={color} />,
    },
    {
      label: t('tabs.leads'),
      value: 'leads',
      icon: (color) => <LeadsIcon color={color} />,
    },
    {
      label: t('tabs.recycle'),
      value: 'recycle',
      icon: (color) => <RefreshIcon size="s" color={color} />,
    },
  ])

  useEffect(() => {
    apiRoutes.getRoutes({ page: 1 }).then(({ data }) => {
      if (data.data.length > 0) {
        setTabs((prevTabs) => [
          ...prevTabs,
          {
            label: t('tabs.routes'),
            value: 'routes',
            icon: (color) => <SettingsIcon color={color} />,
          },
        ])
      }
    })
  }, [])

  // Warn user about leaving the page when there are unsaved changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isChanged) return
      e.preventDefault()
    }

    const onRouteChangeStart = (url: string) => {
      // Allow one navigation pass if user confirmed via QuestionModal
      if (allowNavRef.current) {
        allowNavRef.current = false
        return
      }
      if (!isChanged) return
      // Open custom QuestionModal and cancel this transition
      setPendingUrl(url)
      setModal({ modalName: MODAL_NAMES.QUESTION_MODAL, isOpen: true })
      // Cancel route change
      router.events.emit('routeChangeError')
      // Throw to abort the transition (caught internally by Next.js)
      // eslint-disable-next-line no-throw-literal
      throw 'Route change aborted due to unsaved changes'
    }

    if (isChanged) {
      window.addEventListener('beforeunload', onBeforeUnload)
      router.events.on('routeChangeStart', onRouteChangeStart)
    }

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      router.events.off('routeChangeStart', onRouteChangeStart)
    }
  }, [isChanged, router.asPath, router.events, t])

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout
        title={tRouting('campaign_edit')}
        breadCrumbs={
          <Flex margin="0 0 14px" justify="start" align="center" gap={5}>
            <Text
              styles={{
                color: theme.palette.main23,
                cursor: 'pointer',
                ':hover': {
                  color: theme.palette.main2,
                },
              }}
              onClick={() => router.push(ROUTES.CAMPAIGNS_LIST)}
            >
              {t('breadCrumbs.campaigns')}
            </Text>
            <ArrowIcon direction="right" size="s" />
            <span style={{ color: theme.palette.main3 }}>
              {t('breadCrumbs.campaign')} {campaignId}
            </span>
          </Flex>
        }
      >
        <Container>
          <Flex justify="space-between" align="center" gap={24}>
            <CampaignEditTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {isChanged && (
              <Flex align="center" gap={12}>
                <FilledButton
                  onClick={submitForm}
                  disabled={!isChanged || !isValid}
                  width="150px"
                >
                  {t('pages.general.save')}
                </FilledButton>
                <OutlinedButton onClick={resetFormikData} width="150px" type="button">
                  {t('pages.general.cancel')}
                </OutlinedButton>
              </Flex>
            )}
          </Flex>
          {isLoading && (
            <InlineLoader variant="table" loading={isLoading} borderRadius={4} />
          )}
          {!isLoading && campaign && activeTab === 'general' && (
            <CampaignGeneralPage formik={formik} campaign={campaign} />
          )}
          {!isLoading && campaign && activeTab === 'recycle' && (
            <CampaignRecyclePage formik={formik} campaign={campaign} />
          )}
          {!isLoading && campaign && activeTab === 'leads' && (
            <CampaignLeadsPage formik={formik} campaign={campaign} />
          )}
          {!isLoading && campaign && activeTab === 'routes' && (
            <CampaignRoutesPage formik={formik} />
          )}
        </Container>
        <QuestionModal
          title={t('modal.unsaved-changes.title')}
          description={t('modal.unsaved-changes.description')}
          confirmLabel={t('modal.unsaved-changes.confirm-btn')}
          cancelLabel={t('modal.unsaved-changes.cancel-btn')}
          confirmHandler={() => {
            if (pendingUrl) {
              allowNavRef.current = true
              const nextUrl = pendingUrl
              setPendingUrl(null)
              resetModals()
              router.push(nextUrl)
            } else {
              resetModals()
            }
          }}
          cancelHandler={() => {
            setPendingUrl(null)
            resetModals()
          }}
        />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignEditPage
