import Trans from 'next-translate/Trans'
import { Snackbar } from '@/components/Snackbar'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { TStatuses } from './types'
import useNotifications from './hooks/use-notifications'

type TReturn = JSX.Element | null

export const Notification = (): TReturn => {
  const { notification, resetNotifications } = useNotifications()

  if (!notification) return null

  const textColor: Record<TStatuses, keyof TDefaultPalette> = {
    error: 'main13',
    success: 'main11',
    info: 'main3',
  }

  return (
    <Snackbar status={notification.status} onClose={resetNotifications}>
      <Flex align="center" gap={3}>
        <Trans
          i18nKey={notification.key}
          components={{
            translate: <Text variant="f8" color={textColor[notification.status]} />,
            value: <Text variant="f8" color="main2" />,
          }}
          values={notification.values}
        />
      </Flex>
    </Snackbar>
  )
}
