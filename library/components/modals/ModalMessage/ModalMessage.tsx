import { Card } from '@peiko/components/Card'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { ModalHeader } from '../ModalHeader'
import { Modal } from '../Modal/Modal'
import { TModalMessage } from './types'

export const ModalMessage: React.FC<TModalMessage> = ({
  children,
  status,
  title,
  description,
  submitTitle,
  submitStyles,
  disableCloseSubmit,
  onClickSubmit,
  Icon,
  cardProps = {},
  headerProps = {},
  maxWidth,
  onClose,
  ...props
}) => {
  const closeSubmitHandler = () => {
    if (!disableCloseSubmit) {
      onClose?.()
    }
    onClickSubmit?.()
  }

  return (
    <Modal onClose={onClose} maxWidth={maxWidth || '400px'} {...props}>
      <Card
        fullWidth
        xs={{ padding: '32px 44px 32px', borderRadius: '8px' }}
        {...cardProps}
      >
        <ModalHeader
          title={title}
          description={description}
          status={status}
          Icon={Icon}
          {...headerProps}
        />
        {children}
        {submitTitle && (
          <Box styles={{ marginTop: '32px', ...submitStyles }}>
            <FilledButton width="100%" onClick={closeSubmitHandler}>
              {submitTitle}
            </FilledButton>
          </Box>
        )}
      </Card>
    </Modal>
  )
}
