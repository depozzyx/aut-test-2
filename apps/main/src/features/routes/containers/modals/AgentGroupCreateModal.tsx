import React from 'react'
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

import { TSelectOption } from '@/components/MutliSelect/types'
import { AgentsFormikSelect } from '@/features/common/FormInputs/AgentsMultiSelect/AgentsFormikSelect'
import {
  asyncCreateAgentGroup,
  selectAgentGroupsLoading,
} from '@/features/agent-groups/store/agent-groups'

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
  userIds: Yup.array().of(Yup.object()).optional(),
})

type TFormValues = {
  name: string
  description: string
  assignedAgent: TSelectOption<number>[]
}

export const CreateAgentGroupModal: React.FC = () => {
  const { t } = useTranslation('agents')
  const { modalState, resetModals } = useModals()
  const open =
    modalState?.modalName === MODAL_NAMES.CREATE_AGENT_GROUP && modalState.isOpen
  const { select, dispatch } = useRedux()
  const isLoading = select(selectAgentGroupsLoading)

  const formik = useFormik<TFormValues>({
    initialValues: { name: '', description: '', assignedAgent: [] },
    validationSchema: groupSchema,
    onSubmit: async (values) => {
      dispatch(
        asyncCreateAgentGroup({
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
      title={t('groups.create.title')}
      open={open}
      onClose={resetModals}
      containerWidth="540px"
    >
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" gap={16}>
          <FormikInput
            formik={formik}
            name="name"
            label={{ label: t('groups.fields.name') }}
          />
          <FormikInput
            formik={formik}
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
          <Flex gap={12} justify="flex-end">
            <Flex gap={12} align="center" justify="center">
              <OutlinedButton width="202px" onClick={resetModals}>
                {t('groups.cancel')}
              </OutlinedButton>
              <FilledButton
                type="submit"
                width="202px"
                isLoading={isLoading}
                disabled={!formik.dirty || !formik.isValid || isLoading}
              >
                {t('groups.create.submit')}
              </FilledButton>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </ModalMessage>
  )
}
