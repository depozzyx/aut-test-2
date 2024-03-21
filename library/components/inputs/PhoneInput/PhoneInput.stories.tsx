import { StoryObj, Meta } from '@storybook/react'
import { PhoneInput } from './PhoneInput'

const meta: Meta<typeof PhoneInput> = {
  title: 'Inputs/PhoneInput',
  component: PhoneInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
    docs: { story: { height: '300px' } },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
    onFocus: { action: 'onFocus' },
  },
}

export default meta
type Story = StoryObj<typeof PhoneInput>

export const Default: Story = {
  args: {
    width: 300,
    name: 'phone-input-name',
    placeholder: 'Placeholder',
    label: {
      label: 'Enter phone number',
    },
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    width: 300,
    disabled: true,
    label: {
      label: 'Disabled input',
    },
    placeholder: 'Placeholder',
  },
}

export const WithError: Story = {
  name: 'Error',
  args: {
    width: 300,
    name: 'error',
    label: {
      label: 'Error input',
    },
    error: 'Error message',
    placeholder: '',
  },
}
