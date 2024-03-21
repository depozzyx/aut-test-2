/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { Card } from '@peiko/components/Card'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Text } from '@peiko/components/Text'
import { Modal } from './Modal'
import { TModalProps } from './types'

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalShowCase: React.FC<TModalProps> = ({ open, ...props }) => {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCLose = () => {
    setOpen(false)
  }

  useUpdateEffect(() => {
    setOpen(open)
  }, [open])

  return (
    <>
      <Modal maxWidth={500} {...props} open={isOpen} onClose={handleCLose}>
        <Card
          padding="32px 10px 10px 10px"
          styles={{ textAlign: 'center', width: '300px' }}
        >
          <Text variant="f4" styles={{ marginBottom: '16px' }}>
            Modal Title
          </Text>
          <Text variant="f5">Modal Content</Text>
        </Card>
      </Modal>
      <FilledButton onClick={handleOpen}>Open Modal</FilledButton>
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalShowCase {...args} />,
}
