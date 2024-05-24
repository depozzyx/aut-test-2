import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/routes'
import { DashboardIcon } from '@/icons/DashboardIcon'
import { CampaignsIcon } from '@/icons/CampaignsIcon'
import { AgentsIcon } from '@/icons/AgentsIcon'
import { LeadsIcon } from '@/icons/LeadsIcon'
import { SettingsIcon } from '@/icons/SettingsIcon'
import { UserWithTie } from '@peiko/components/icons/UserWithTie'

type TMenuItem = {
  title: string
  icon: JSX.Element
  links: {
    title: string
    link: string
    disabled: boolean
  }[]
}

export const useMenuLinks = (): TMenuItem[] => {
  const { t } = useTranslation('routing')

  const links = [
    {
      title: t('dashboard'),
      icon: <DashboardIcon />,
      links: [
        {
          title: t('dashboard_active_campaigns'),
          link: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS,
          disabled: false,
        },
        {
          title: t('dashboard_active_agents'),
          link: ROUTES.DASHBOARD_ACTIVE_AGENTS,
          disabled: false,
        },
        {
          title: t('dashboard_campaign_effectiveness'),
          link: ROUTES.DASHBOARD_CAMPAIGN_EFFECTIVENESS,
          disabled: false,
        },
      ],
    },
    {
      title: t('campaigns'),
      icon: <CampaignsIcon />,
      links: [
        {
          title: t('campaigns_list'),
          link: ROUTES.CAMPAIGNS_LIST,
          disabled: false,
        },
        {
          title: t('campaigns_analytics'),
          link: ROUTES.CAMPAIGNS_ANALYTICS,
          disabled: false,
        },
      ],
    },
    {
      title: t('agents'),
      icon: <AgentsIcon />,
      links: [
        {
          title: t('agents_list'),
          link: ROUTES.AGENTS_LIST,
          disabled: false,
        },
        {
          title: t('agents_analytics'),
          link: ROUTES.AGENTS_ANALYTICS,
          disabled: false,
        },
        {
          title: t('create_agent'),
          link: ROUTES.CREATE_AGENT,
          disabled: false,
        },
      ],
    },
    {
      title: t('leads'),
      icon: <LeadsIcon />,
      links: [
        {
          title: t('leads_list'),
          link: ROUTES.LEADS_LIST,
          disabled: false,
        },
        {
          title: t('import_leads'),
          link: ROUTES.IMPORT_LEADS,
          disabled: false,
        },
        {
          title: t('import_leads_instructions'),
          link: ROUTES.IMPORT_LEADS_INSTRUCTIONS,
          disabled: false,
        },
      ],
    },
    {
      title: t('managers'),
      icon: <UserWithTie color="base" />,
      links: [
        {
          title: t('managers_list'),
          link: ROUTES.MANAGERS_LIST,
          disabled: false,
        },
        {
          title: t('create_manager'),
          link: ROUTES.CREATE_MANAGER,
          disabled: false,
        },
      ],
    },
    {
      title: t('settings'),
      icon: <SettingsIcon />,
      links: [
        {
          title: t('settings_account_management'),
          link: ROUTES.SETTINGS_ACCOUNT_MANAGEMENT,
          disabled: false,
        },
        {
          title: t('settings_api_key_management'),
          link: ROUTES.SETTINGS_API_KEY_MANAGEMENT,
          disabled: false,
        },
        {
          title: t('settings_activity_log'),
          link: ROUTES.SETTINGS_ACTIVITY_LOG,
          disabled: false,
        },
      ],
    },
  ]

  return links
}
