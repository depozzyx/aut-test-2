import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/routes'
import { DashboardIcon } from '@/icons/DashboardIcon'
import { CampaignsIcon } from '@/icons/CampaignsIcon'
import { AgentsIcon } from '@/icons/AgentsIcon'
import { LeadsIcon } from '@/icons/LeadsIcon'
import { SettingsIcon } from '@/icons/SettingsIcon'
import { UserWithTie } from '@peiko/components/icons/UserWithTie'
import { useAuth } from '@/features/common/user'
import { ERoles } from '@/constants/profile'

type TMenuItem = {
  title: string
  icon: JSX.Element
  availableRoles: string[]
  disabled?: boolean
  links: {
    title: string
    link: string
    disabled: boolean
    availableRoles: string[]
  }[]
}

const filterMenuItemsByRole = (menuItems: TMenuItem[], userRole: string) =>
  menuItems
    .filter((item) => item.availableRoles.includes(userRole))
    .map((item) => ({
      ...item,
      links: item.links.filter((link) => link.availableRoles.includes(userRole)),
    }))

export const useMenuLinks = (): TMenuItem[] => {
  const { t } = useTranslation('routing')
  const { user } = useAuth()

  const links: TMenuItem[] = [
    {
      title: t('dashboard'),
      icon: <DashboardIcon />,
      availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
      links: [
        {
          title: t('dashboard_active_campaigns'),
          link: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        {
          title: t('dashboard_active_agents'),
          link: ROUTES.DASHBOARD_ACTIVE_AGENTS,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        // {
        //   title: t('dashboard_campaign_effectiveness'),
        //   link: ROUTES.DASHBOARD_CAMPAIGN_EFFECTIVENESS,
        //   disabled: false,
        //   availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        // },
      ],
    },
    {
      title: t('campaigns'),
      icon: <CampaignsIcon />,
      availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
      links: [
        {
          title: t('campaigns_list'),
          link: ROUTES.CAMPAIGNS_LIST,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        // {
        //   title: t('campaigns_analytics'),
        //   link: ROUTES.CAMPAIGNS_ANALYTICS,
        //   disabled: false,
        //   availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        // },
      ],
    },
    {
      title: t('leads'),
      icon: <LeadsIcon />,
      availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
      links: [
        {
          title: t('leads_list'),
          link: ROUTES.LEADS_LIST,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        {
          title: t('leads'),
          link: ROUTES.LEADS,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        {
          title: t('import_leads'),
          link: ROUTES.IMPORT_LEADS,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        {
          title: t('import_leads_instructions'),
          link: ROUTES.IMPORT_LEADS_INSTRUCTIONS,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
      ],
    },
    {
      title: t('agents'),
      icon: <AgentsIcon />,
      availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.AGENT],
      links: [
        {
          title: t('agents_list'),
          link: ROUTES.AGENTS_LIST,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        // {
        //   title: t('agents_analytics'),
        //   link: ROUTES.AGENTS_ANALYTICS,
        //   disabled: false,
        //   availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        // },
        {
          title: t('agents_calls'),
          link: ROUTES.AGENT_CALLS,
          disabled: false,
          availableRoles: [ERoles.AGENT],
        },
      ],
    },
    {
      title: t('managers'),
      icon: <UserWithTie color="base" />,
      availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
      links: [
        {
          title: t('managers_list'),
          link: ROUTES.MANAGERS_LIST,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
      ],
    },
    {
      title: t('settings'),
      icon: <SettingsIcon />,
      availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.AGENT],
      disabled: false,
      links: [
        {
          title: t('settings_admins_list'),
          link: ROUTES.SETTINGS_ADMINS_LIST,
          disabled: false,
          availableRoles: [ERoles.SUPERADMIN],
        },
        {
          title: t('settings_account_management'),
          link: ROUTES.SETTINGS_ACCOUNT_MANAGEMENT,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.AGENT],
        },
        {
          title: t('settings_campaigns_management'),
          link: ROUTES.SETTINGS_CAMPAIGNS_MANAGEMENT,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        {
          title: t('settings_leads_management'),
          link: ROUTES.SETTINGS_LEADS_MANAGEMENT,
          disabled: false,
          availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        },
        // {
        //   title: t('settings_api_key_management'),
        //   link: ROUTES.SETTINGS_API_KEY_MANAGEMENT,
        //   disabled: false,
        //   availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        // },
        // {
        //   title: t('settings_activity_log'),
        //   link: ROUTES.SETTINGS_ACTIVITY_LOG_GENERAL,
        //   disabled: false,
        //   availableRoles: [ERoles.MANAGER, ERoles.ADMIN, ERoles.SUPERADMIN],
        // },
      ],
    },
  ]

  return filterMenuItemsByRole(links, user?.role || '')
}
