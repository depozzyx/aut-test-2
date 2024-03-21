import { StoryObj, Meta } from '@storybook/react'
import { Toogle } from './Toogle'

const meta: Meta<typeof Toogle> = {
  title: 'Inputs/Toogle',
  component: Toogle,
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
type Story = StoryObj<typeof Toogle>

/**
 * Toogle component
 */
export const Default: Story = {
  args: {
    name: 'toogle',
  },
}

/**
 * Toogle component checked.
 * Toogle becomes controlled component when checked is passed
 */
export const Checked: Story = {
  args: {
    name: 'toogle',
    checked: true,
  },
}

/**
 * Toogle component with error
 */
export const WithError: Story = {
  args: {
    name: 'toogle',
    error: 'Error message',
  },
}

/**
 * Toogle component with error
 */
export const WithLabel: Story = {
  args: {
    name: 'toogle',
    label: 'Toogle label',
  },
}

/**
 * Toogle component disabled
 */
export const Disabled: Story = {
  args: {
    name: 'toogle',
    label: 'Toogle disabled',
    disabled: true,
  },
}
