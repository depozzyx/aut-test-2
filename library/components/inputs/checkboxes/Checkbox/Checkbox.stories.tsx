import { StoryObj, Meta } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    name: 'checkbox',
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    name: 'checkbox',
  },
}

export const WithLabel: Story = {
  args: {
    name: 'checkbox',
    label: 'Option 1',
  },
}

export const WithSize: Story = {
  args: {
    size: 's',
    name: 'checkbox',
    label: 'Option 1',
  },
}

export const WithError: Story = {
  args: {
    name: 'checkbox',
    label: 'Option 1',
    error: 'Wrong option',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    name: 'checkbox',
    label: 'Disabled checkbox',
  },
}
