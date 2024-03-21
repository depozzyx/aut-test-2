import { StoryObj, Meta } from '@storybook/react'
import { CodeInput } from './CodeInput'

const meta: Meta<typeof CodeInput> = {
  title: 'Inputs/CodeInput',
  component: CodeInput,
  parameters: {
    layout: 'centered',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CodeInput>

export const Default: Story = {
  args: {
    name: 'code',
    fields: 4,
  },
}

export const WithLabel: Story = {
  args: {
    name: 'code',
    fields: 4,
    label: { label: 'Code Input' },
  },
}

export const WithFields: Story = {
  args: {
    name: 'code',
    fields: 8,
    label: { label: 'Code Input' },
  },
}

export const Disabled: Story = {
  args: {
    name: 'code',
    disabled: true,
    label: { label: 'Disabled Code Input' },
  },
}

export const WithError: Story = {
  args: {
    name: 'code',
    error: 'Wrong code',
    label: { label: 'With Error' },
  },
}
