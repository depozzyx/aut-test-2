/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { CopyIcon } from '@peiko/components/icons/CopyIcon'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Data display/Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
  argTypes: {
    children: {
      description: 'React Element to be rendered inside the badge.',
      type: { name: 'string', required: true }, // Setting required to true
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * Badge component
 */
export const Default: Story = {
  args: {
    count: 5,
    children: <CopyIcon />,
  },
}

/**
 * Badge component with max count
 */
export const WithMaxCount: Story = {
  args: {
    count: 1000,
    maxCount: 99,
    children: <CopyIcon />,
  },
}

/**
 * Badge component with custom color
 */
export const WithColor: Story = {
  args: {
    count: 1000,
    maxCount: 99,
    color: 'main7',
    children: <CopyIcon />,
  },
}

export const WithoutCount: Story = {
  args: {
    maxCount: 99,
    children: <CopyIcon />,
  },
}
