import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { TextButton } from '@peiko/components/buttons/TextButton'

import { Separator } from '../../styles'

type TAuthButtons = {
  buttons: Array<{ text: string }>
}

export const AuthButtons: FC<TAuthButtons> = ({ buttons }) => {
  const { t } = useTranslation('auth')

  const [countVisible, setCountVisible] = useState<number>(2)

  const handleViewMore = () => {
    setCountVisible(4)
  }

  return (
    <>
      <Separator> {t('or')}</Separator>
      {buttons.map((item, index) => {
        if (index < countVisible) {
          return (
            <OutlinedButton
              key={Number(index)}
              size="m"
              width="100%"
              maxWidth="404px"
              styles={{ marginTop: '16px' }}
            >
              {item.text}
            </OutlinedButton>
          )
        }

        return null
      })}
      {countVisible === 2 && (
        <TextButton
          onClick={handleViewMore}
          styles={{
            margin: '12px auto',
            display: 'flex',
          }}
        >
          {t('view-more')}
        </TextButton>
      )}
    </>
  )
}
