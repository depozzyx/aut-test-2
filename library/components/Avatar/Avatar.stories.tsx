/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Text } from '@peiko/components/Text'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Data display/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Avatar>

/**
 * Avatar component
 */
export const Default: Story = {
  args: {
    children: 'A',
  },
}

/**
 * Avatar component with size
 */
export const WithSize: Story = {
  args: {
    size: 60,
    children: 'H',
  },
}

/**
 * Avatar component with size
 */
export const WithBreakpointSizes: Story = {
  args: {
    children: 'H',
    size: {
      xs: 20,
      sm: 40,
      md: 60,
      lg: 80,
    },
  },
}

/**
 * Avatar component with custom color
 */
export const WithColor: Story = {
  args: {
    children: 'H',
    bgColor: 'main7',
  },
}

/**
 * Avatar component with next image
 */
export const WithNextImage: Story = {
  args: {
    src: '/images/avatar.jpg',
  },
}

/**
 * Avatar component with styles
 */
export const WithStyles: Story = {
  args: {
    children: <Text variant="f1">P</Text>,
    styles: {
      width: '100px',
      height: '100px',
      borderRadius: '4px',
    },
  },
}
