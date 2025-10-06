import { StoryObj, Meta } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Inputs/Toggle',
  component: Toggle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    name: {
      description: 'The name of the input.',
      type: { name: 'string', required: true }, // Setting required to true
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

/**
 * Toggle component
 */
export const Default: Story = {
  args: {
    name: 'toggle',
  },
}

/**
 * Toggle component checked.
 * Toggle becomes controlled component when checked is passed
 */
export const Checked: Story = {
  args: {
    name: 'toggle',
    checked: true,
  },
}

/**
 * Toggle component with error
 */
export const WithError: Story = {
  args: {
    name: 'toggle',
    error: 'Error message',
  },
}

/**
 * Toggle component with error
 */
export const WithLabel: Story = {
  args: {
    name: 'toggle',
    label: 'Toggle label',
  },
}

/**
 * Toggle component disabled
 */
export const Disabled: Story = {
  args: {
    name: 'toggle',
    label: 'Toggle disabled',
    disabled: true,
  },
}
