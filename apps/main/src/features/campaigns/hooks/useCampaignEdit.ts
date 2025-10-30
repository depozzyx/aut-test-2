import { useEffect, useMemo, useState } from 'react'

import { useFormik } from 'formik'

import { useRedux } from '@/hooks/use-redux'
import { hasArrayChanged } from '@/utils/array'
import {
  TAgent,
  TCampaignById,
  TLeadList,
  TRecycleRule,
} from '@/api-rest/campaigns/types'
import { createCampaignValidationSchema } from '@/utils/validation'
import { TSelectOption } from '@/components/MutliSelect/types'
import { TFormik } from '@peiko/types/formik'
import { TAgentGroup } from '@/api-rest/users/groups.types'
import { handleRestError } from '@/features/common/error'
import { workHours } from '@/constants/settings'
import { apiCampaigns } from '@/api-rest/campaigns'
import { apiOutboundConfigs } from '@/api-rest/outbound-config'
import { TOutboundConfig } from '@/api-rest/outbound-config/types'
import { apiAgentGroups } from '@/api-rest/users/groups.api'
import { selectAgentGroupsList } from '../../agent-groups/store/agent-groups'

export type RouteRow = TOutboundConfig & { isChanged: boolean } & {
  routeId: number
  routeName: string
}
export type TEditCampaignFormValues = {
  name: string
  agentGroups: TSelectOption<number>[]
  assignedAgent: TSelectOption<number>[]
  leadList: TSelectOption<number>[]
  holdTime: number
  mode: string
  coefficient: number
  filterLeadStatuses: string[]
  recycleRules: TRecycleRule[]
  routes: RouteRow[]
  workHours?: string
}

type TReturn = {
  campaign: TCampaignById | undefined
  formik: TFormik<TEditCampaignFormValues>
  isChanged: boolean
  isLoading: boolean
  resetFormikData: () => void
  submitForm: () => void
  reload: () => void
  isValid: boolean
}

export const useCampaignEdit = ({ campaignId }: { campaignId: number }): TReturn => {
  const { dispatch, select } = useRedux()
  const agentGroups = select(selectAgentGroupsList)

  const [campaign, setCampaign] = useState<TCampaignById>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [campaignRoutes, setRoutes] = useState<TOutboundConfig[]>([])
  const [oldAgentGroups, setOldAgentGroups] = useState<TAgentGroup[]>([])

  const fetchCampaignInfo = async () => {
    if (!campaignId) return
    try {
      setLoading(true)
      const campaign = await apiCampaigns.getCampaignById(campaignId.toString())
      const agentGroups = await apiAgentGroups.getGroups({
        ids: campaign.data?.data.agentGroups.map((group) => group.id) || [],
      })
      setOldAgentGroups(agentGroups.data?.data || [])

      if (campaign.data) setCampaign(campaign.data.data)
      const routes = await apiOutboundConfigs.getOutboundConfigs({ campaignId })
      if (routes.data)
        setRoutes(
          routes.data.data?.map((route) => ({
            isChanged: false,
            ...route,
          })) || [],
        )
    } catch (e) {
      setLoading(false)
      handleRestError({ e, dispatch })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCampaignInfo()
  }, [campaignId])

  const reload = () => {
    fetchCampaignInfo()
  }

  const handleRoutesUpdate = async (routes: RouteRow[], campaignId: number) => {
    try {
      // Prepare create/update requests
      const requests: Promise<unknown>[] = routes
        .filter((route) => route.isChanged)
        .map((route) => {
          const existingRoute = campaignRoutes.find((r) => r.id === route.id)
          return existingRoute
            ? apiOutboundConfigs.updateOutboundConfig(route.id, {
                prefix: route.prefix,
                routeId: route.routeId,
                active: route.active,
              })
            : apiOutboundConfigs.createOutboundConfig({
                prefix: route.prefix,
                routeId: route.routeId,
                campaignId,
                active: route.active,
              })
        })

      // Prepare delete requests for routes that existed but were removed
      const deleteRequests: Promise<unknown>[] = campaignRoutes
        .filter((existingRoute) => !routes.some((r) => r.id === existingRoute.id))
        .map((existingRoute) => apiOutboundConfigs.deleteOutboundConfig(existingRoute.id))

      await Promise.all([...requests, ...deleteRequests])
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const formik = useFormik<TEditCampaignFormValues>({
    initialValues: {
      name: '',
      agentGroups: [],
      assignedAgent: [],
      leadList: [],
      holdTime: 0,
      mode: '',
      coefficient: 0,
      filterLeadStatuses: [],
      recycleRules: [],
      workHours: workHours[0],
      routes: [],
    },
    validationSchema: createCampaignValidationSchema,
    onSubmit,
  })

  const setCampaignData = () => {
    if (!campaign) return
    formik.setValues({
      name: campaign.name,
      assignedAgent: campaign.assignedAgents.map((agent: TAgent) => ({
        value: agent?.id,
        label: agent?.username,
      })),
      leadList: campaign.leadLists.map((list: TLeadList) => ({
        value: list?.id,
        label: list?.name,
      })),
      agentGroups: (campaign.agentGroups ?? []).map((group: TAgentGroup) => ({
        value: group?.id,
        label: group?.name,
      })),
      holdTime: campaign?.holdTime,
      mode: campaign?.mode,
      coefficient: campaign?.coefficient,
      filterLeadStatuses: campaign?.filterLeadStatuses,
      recycleRules: campaign?.recycleRules,
      workHours: campaign?.workHours || workHours[0],
      routes: campaignRoutes.map((route) => ({
        ...route,
        routeId: route.route.id,
        routeName: route.route.name,
        isChanged: false,
      })),
    })
  }

  useEffect(() => {
    setCampaignData()
  }, [campaign, campaignRoutes])

  useEffect(() => {
    if (!formik.values?.recycleRules?.length) {
      return
    }
    formik.values.recycleRules.forEach((rule) => {
      rule.status.forEach((status) => {
        if (!formik.values.filterLeadStatuses.includes(status)) {
          formik.setFieldValue('filterLeadStatuses', [
            ...formik.values.filterLeadStatuses,
            status,
          ])
        }
      })
    })
  }, [formik.values.recycleRules])

  useEffect(() => {
    if (!formik.values?.recycleRules?.length) {
      return
    }
    formik.values.recycleRules.forEach((rule) => {
      rule.status.forEach((status) => {
        if (!formik.values.filterLeadStatuses.includes(status)) {
          formik.setFieldValue('filterLeadStatuses', [
            ...formik.values.filterLeadStatuses,
            status,
          ])
        }
      })
    })
  }, [formik.values.recycleRules])

  useEffect(() => {
    const currentAgents = formik.values.assignedAgent
    const addedGroups = formik.values.agentGroups
      .filter((g) => !oldAgentGroups.some((og) => og.id === g.value))
      .map((g) => agentGroups.find((ag) => ag.id === g.value))

    const addedAgents = addedGroups
      .flatMap((group) => group?.agents ?? [])
      .reduce((acc, agent) => {
        if (
          !acc.find((a) => a.id === agent.id) &&
          !currentAgents.find((a) => a.value === agent.id)
        )
          acc.push(agent)
        return acc
      }, [] as TAgent[])

    const deletedGroups = oldAgentGroups.filter(
      (og) => !formik.values.agentGroups.some((g) => g.value === og.id),
    )
    const agents = oldAgentGroups
      .filter((og) => !deletedGroups.some((dg) => dg.id === og.id))
      .flatMap((group) => group?.agents ?? [])

    const deletedAgents = deletedGroups
      .flatMap((group) => group.agents)
      .reduce((acc, agent) => {
        if (agent && !agents.find((a) => a.id === agent.id)) acc.add(agent.id)
        return acc
      }, new Set())

    const newAgents = [
      ...formik.values.assignedAgent.filter((agent) => !deletedAgents.has(agent.value)),
      ...addedAgents.map((agent) => ({ value: agent.id, label: agent.username })),
    ]

    formik.setFieldValue('assignedAgent', newAgents)
    setOldAgentGroups(
      oldAgentGroups
        .filter((og) => !deletedGroups.some((g) => g.id === og.id))
        .concat(addedGroups.filter((g): g is TAgentGroup => !!g)),
    )
  }, [formik.values.agentGroups])

  const isCampaignChanged = useMemo(
    () =>
      !!campaign &&
      (campaign.name !== formik.values.name ||
        campaign.workHours !== formik.values.workHours ||
        hasArrayChanged(
          campaign.assignedAgents.map((a) => a.id),
          formik.values.assignedAgent.map((a) => a.value),
        ) ||
        hasArrayChanged(
          campaign.leadLists.map((a) => a.id),
          formik.values.leadList.map((a) => a.value),
        ) ||
        hasArrayChanged(
          campaign.agentGroups.map((a) => a.id),
          formik.values.agentGroups.map((a) => a.value),
        ) ||
        campaign.holdTime !== formik.values.holdTime ||
        campaign.mode !== formik.values.mode ||
        campaign.coefficient !== formik.values.coefficient ||
        JSON.stringify(campaign.recycleRules) !==
          JSON.stringify(formik.values.recycleRules) ||
        hasArrayChanged(campaign.filterLeadStatuses, formik.values.filterLeadStatuses)),
    [campaign, formik.values],
  )

  const isRoutesChanged = useMemo(
    () =>
      !!campaign &&
      (formik.values.routes.some((route) => route.isChanged) ||
        formik.values.routes.length !== campaignRoutes.length),
    [campaign, formik.values.routes],
  )

  async function onSubmit(formData: TEditCampaignFormValues) {
    const { leadList, assignedAgent, agentGroups, routes, ...data } = formData
    if (isCampaignChanged) {
      const dataForRequest = {
        ...data,
        id: campaignId,
        agentGroupIds: (agentGroups ?? []).map((item) => item.value),
        leadListIds: leadList.map((item) => item.value),
        assignedAgentIds: assignedAgent.map((item) => item.value),
      }

      await apiCampaigns.editCampaign(dataForRequest)
    }
    if (isRoutesChanged) {
      await handleRoutesUpdate(routes, campaignId)
    }
    await fetchCampaignInfo()
  }

  useEffect(() => {
    setTimeout(() => formik.setTouched({ filterLeadStatuses: true }, true), 0)
  }, [formik.values.filterLeadStatuses])

  const isRecycleRulesInvalid = () =>
    formik.values.recycleRules?.length && !formik.values.recycleRules[0].status

  const isValid = useMemo(() => {
    if (isRecycleRulesInvalid()) {
      return false
    }
    return formik.isValid
  }, [formik.isValid, formik.values.recycleRules])

  const resetFormikData = () => {
    setCampaignData()
  }

  const submitForm = () => {
    if (campaign) {
      formik.submitForm()
    }
  }
  return {
    campaign,
    formik,
    isChanged: isCampaignChanged || isRoutesChanged,
    isLoading,
    resetFormikData,
    isValid,
    submitForm,
    reload,
  }
}
