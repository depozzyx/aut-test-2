import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { Calls } from '@/features/calls/Calls'
import { ERoles } from '@/constants/profile'
import { Header } from '@/layout/common/Header'
import React from 'react'

const CallsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:calls'))

  return (
    <Permissions roles={[ERoles.AGENT]}>
      <>
        <Header />
        <Calls />
      </>
    </Permissions>
  )
}

export default CallsPage
