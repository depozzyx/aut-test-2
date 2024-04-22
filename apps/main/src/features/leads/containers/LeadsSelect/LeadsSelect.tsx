import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import React, { FC } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import useTranslation from 'next-translate/useTranslation'
import { TSelectProps } from '@peiko/components/inputs/Select/types'
import { TLeadsGroup } from '../../mocks/leadsListMock'
import { selectLeadsGroup, selectLeadsGroups, setLeadsGroup } from '../../store/leads'

export const LeadsSelect: FC<
  Omit<TSelectProps, 'name' | 'onChange' | 'value' | 'menuContent'>
> = (props) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('leads-list')

  const { leadsGroup, leadsGroups } = select(
    createStructuredSelector({
      leadsGroup: selectLeadsGroup,
      leadsGroups: selectLeadsGroups,
    }),
    shallowEqual,
  )

  return (
    <Select
      name="leads-group"
      options={leadsGroups}
      value={leadsGroup !== undefined ? leadsGroup : ''}
      onChange={(data) => {
        if (data) dispatch(setLeadsGroup(data.value as TLeadsGroup['value']))
      }}
      placeholder={t('headers.select')}
      menuContent={{
        place: 'append',
        element: (
          <Link href={ROUTES.CABINET_DASHBOARD}>
            <Flex
              padding="7px 16px"
              align="center"
              justify="space-between"
              cursor="pointer"
            >
              <Text variant="f8">{t('headers.createNewList')}</Text>
              <PlusIcon width="16px" height="16px" />
            </Flex>
          </Link>
        ),
      }}
      {...props}
    />
  )
}
