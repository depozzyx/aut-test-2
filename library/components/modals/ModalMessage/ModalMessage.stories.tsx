/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { CalendarIcon } from '@peiko/components/icons/CalendarIcon'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { ModalMessage as Modal } from './ModalMessage'
import { TModalMessage } from './types'

const meta: Meta<typeof ModalMessage> = {
  title: 'Feedback/ModalMessage',
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
type Story = StoryObj<typeof ModalMessage>

const ModalMessage: React.FC<TModalMessage> = ({ open, ...props }) => {
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
      <FilledButton onClick={handleOpen}>Open Modal</FilledButton>
      <Modal
        open={isOpen}
        onClose={handleCLose}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        {...props}
      />
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalMessage title="Default props" {...args} />,
}

export const MaxWidth: Story = {
  render: (args) => <ModalMessage maxWidth="600px" title="Max width 600px" {...args} />,
}

export const CustomIcon: Story = {
  render: (args) => <ModalMessage title="Custom icon" Icon={CalendarIcon} {...args} />,
}

export const DisableCloseOutside: Story = {
  render: (args) => (
    <ModalMessage title="Disable close outside" disableCloseOutside {...args} />
  ),
}

export const TitleSubmit: Story = {
  render: (args) => (
    <ModalMessage title="Title submit" submitTitle="Submit button" {...args} />
  ),
}

export const SubmitStyles: Story = {
  render: (args) => (
    <ModalMessage
      title="Title submit"
      submitTitle="Submit button"
      submitStyles={{ md: { marginTop: '60px' } }}
      {...args}
    />
  ),
}

export const DisableCloseSubmit: Story = {
  render: (args) => (
    <ModalMessage
      title="Disable close submit"
      submitTitle="Submit button"
      disableCloseSubmit
      {...args}
    />
  ),
}

export const onClickSubmit: Story = {
  render: (args) => (
    <ModalMessage
      title="On click submit"
      submitTitle="Submit button"
      // eslint-disable-next-line no-alert
      onClickSubmit={() => alert('onClickSumbit')}
      {...args}
    />
  ),
}

export const Success: Story = {
  render: (args) => <ModalMessage status="success" {...args} />,
}

export const Info: Story = {
  render: (args) => <ModalMessage status="info" {...args} />,
}

export const Error: Story = {
  render: (args) => <ModalMessage status="error" {...args} />,
}

export const CardProps: Story = {
  render: (args) => (
    <ModalMessage
      title="Card props"
      cardProps={{
        styles: { md: { background: ({ palette }) => palette.base2 } },
        md: { padding: '60px 32px', borderRadius: '30px' },
      }}
      {...args}
    />
  ),
}

export const HeaderProps: Story = {
  render: (args) => (
    <ModalMessage
      title="Header props"
      Icon={CalendarIcon}
      headerProps={{
        gap: { xs: '32px', sm: '16px' },
        variantTitle: { xs: 'f2', sm: 'f4' },
        variantDesc: { xs: 'f4', sm: 'f7' },
        alignItems: 'flex-start',
        iconDimensions: { md: { width: '100px', height: '100px' } },
      }}
      {...args}
    />
  ),
}
