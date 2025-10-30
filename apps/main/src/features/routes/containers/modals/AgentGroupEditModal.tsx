import React, { useEffect, useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { Flex } from '@/components/Flex'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { TAgent } from '@/api-rest/agents/types'
import { TSelectOption } from '@/components/MutliSelect/types'
import { AgentsFormikSelect } from '@/features/common/FormInputs/AgentsMultiSelect/AgentsFormikSelect'
import {
  asyncFetchAgentGroup,
  asyncUpdateAgentGroup,
  selectAgentCurrentGroup,
} from '../../../agent-groups/store/agent-groups'

const groupSchema = Yup.object({
  name: Yup.string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .min(1, 'Minimum 1 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .required('This field is required'),
  description: Yup.string().optional(),
  userIds: Yup.array().of(Yup.number()).optional(),
})

type TFormValues = {
  name: string
  description: string
  assignedAgent: TSelectOption<number>[]
}

export const EditAgentGroupModal: React.FC<{ groupId: number | null }> = ({
  groupId,
}) => {
  const { t } = useTranslation('agents')
  const { modalState, resetModals } = useModals()
  const open = modalState?.modalName === MODAL_NAMES.EDIT_AGENT_GROUP && modalState.isOpen
  const { select, dispatch } = useRedux()
  const currentGroup = select(selectAgentCurrentGroup)

  useEffect(() => {
    if (open) {
      if (groupId) dispatch(asyncFetchAgentGroup(groupId))
    }
  }, [open, groupId, dispatch])

  const initialValues = useMemo(
    () => ({
      name: currentGroup?.name ?? '',
      description: currentGroup?.description ?? '',
      assignedAgent: (currentGroup?.agents ?? []).map((u: TAgent) => ({
        label: u.username,
        value: u.id,
      })),
    }),
    [currentGroup],
  )

  const formik = useFormik<TFormValues>({
    initialValues,
    validationSchema: groupSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!groupId) return
      dispatch(
        asyncUpdateAgentGroup(groupId, {
          name: values.name,
          description: values.description,
          userIds: values.assignedAgent.map((agent) => agent.value),
        }),
      )
      formik.resetForm()
      resetModals()
    },
  })

  return (
    <ModalMessage
      title={t('groups.edit.title')}
      open={open}
      onClose={resetModals}
      containerWidth="540px"
    >
      <Flex direction="column" gap={16} width="100%">
        <FormikInput
          formik={formik as any}
          name="name"
          label={{ label: t('groups.fields.name') }}
        />
        <FormikInput
          formik={formik as any}
          name="description"
          label={{ label: t('groups.fields.description') }}
        />
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <AgentsFormikSelect
              formik={formik}
              name="assignedAgent"
              label={t('groups.fields.users')}
            />
          </div>
        </div>
        <Flex gap={12} align="center" justify="center">
          <OutlinedButton width="202px" onClick={resetModals}>
            {t('groups.cancel')}
          </OutlinedButton>
          <FilledButton width="202px" onClick={() => formik.handleSubmit()}>
            {t('groups.edit.submit')}
          </FilledButton>
        </Flex>
      </Flex>
    </ModalMessage>
  )
}
