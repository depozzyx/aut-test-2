import { StoryObj, Meta } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    options: [
      { label: 'Radio 1', value: 'one' },
      { label: 'Radio 2', value: 'two' },
      { label: 'Radio 3', value: 'three' },
    ],
    name: 'radiogroup1',
  },
}

export const ColumnDirection: Story = {
  args: {
    direction: 'column',
    options: [
      { label: 'Radio 1', value: 'one' },
      { label: 'Radio 2', value: 'two' },
      { label: 'Radio 3', value: 'three' },
    ],
    name: 'radiogroup2',
    defaultValue: 'two2',
  },
}

export const WithDisabled: Story = {
  args: {
    options: [
      { label: 'Radio 1', value: 'one' },
      { label: 'Radio 2', value: 'two' },
      { label: 'Radio 3', value: 'three', disabled: true },
    ],
    name: 'radiogroup3',
    defaultValue: 'two2',
  },
}
