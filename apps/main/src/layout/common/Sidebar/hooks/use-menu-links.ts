import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/routes'

type TMenuItem = {
  title: string
  link: string
  disabled: boolean
}

export const useMenuLinks = (): TMenuItem[] => {
  const { t } = useTranslation('routing')

  return [
    {
      title: t('dashboard'),
      link: ROUTES.CABINET_DASHBOARD,
      disabled: false,
    },
    {
      title: t('calls'),
      link: ROUTES.CABINET_CALLS,
      disabled: false,
    },
    {
      title: t('campaigns-list'),
      link: ROUTES.CABINET_CAMPAIGNS_LIST,
      disabled: false,
    },
    {
      title: t('agents-list'),
      link: ROUTES.CABINET_AGENTS_LIST,
      disabled: false,
    },
  ]
}
