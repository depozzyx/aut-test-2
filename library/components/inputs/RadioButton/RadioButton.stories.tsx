import { StoryObj, Meta } from '@storybook/react'
import { RadioButton } from './RadioButton'

const meta: Meta<typeof RadioButton> = {
  title: 'Inputs/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioButton>

export const Default: Story = {
  args: {
    name: 'radio1',
    inputProps: {},
  },
}

export const WithLabel: Story = {
  args: {
    inputProps: {
      checked: true,
    },
    name: 'radio2',
    label: 'Option 1',
  },
}

export const Disabled: Story = {
  args: {
    inputProps: {
      disabled: true,
    },
    name: 'radio3',
    label: 'Disabled RadioButton',
  },
}
