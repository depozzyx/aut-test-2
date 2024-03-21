/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Card } from '@peiko/components/Card'
import { Drawer as DrawerComponent } from './Drawer'
import { TDrawerProps } from './types'

const meta: Meta<typeof DrawerComponent> = {
  title: 'Navigation/Drawer',
  component: DrawerComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    position: {
      options: ['left', 'right', 'top', 'bottom'],
      defaultValue: 'left',
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof DrawerComponent>

const Drawer: React.FC<TDrawerProps> = ({ open, ...props }) => {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  useUpdateEffect(() => {
    setOpen(open)
  }, [open])

  const handleCLose = () => {
    setOpen(false)
  }

  return (
    <>
      <DrawerComponent
        {...props}
        open={isOpen}
        onClose={handleCLose}
        position={props.position}
      >
        <Card fullHeight fullWidth borderRadius={0}>
          Drawer Content
        </Card>
      </DrawerComponent>
      <FilledButton onClick={handleOpen}>Open Drawer</FilledButton>
    </>
  )
}

export const Default: Story = {
  render: (args) => <Drawer {...args} />,
}
