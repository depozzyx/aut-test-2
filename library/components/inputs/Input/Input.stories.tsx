import { StoryObj, Meta } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
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
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    name: 'input-name',
    placeholder: 'Placeholder',
    label: {
      label: 'Label',
    },
  },
}

export const WithDebounce: Story = {
  args: {
    name: 'Debounce input',
    debounce: 500,
    placeholder: 'Placeholder',
    label: {
      label: 'Label',
    },
  },
}

export const WithSize: Story = {
  name: 'Small',
  args: {
    size: 's',
    label: {
      label: 'Small input',
    },
    placeholder: 'Placeholder',
  },
}

export const WithSizes: Story = {
  name: 'With breakpoint sizes',
  args: {
    size: {
      xs: 's',
      sm: 'm',
      md: 'l',
    },
    label: {
      label: 'Label',
    },
    placeholder: 'Placeholder',
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
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
    name: 'error',
    label: {
      label: 'Error input',
    },
    error: 'Error message',
    placeholder: '',
  },
}

export const NumberInput: Story = {
  name: 'Number input',
  args: {
    name: 'number',
    label: {
      label: 'Number input',
    },
    type: 'number',
    placeholder: 'Set amount',
  },
}

export const MaskedInput: Story = {
  name: 'Masked input',
  args: {
    name: 'number',
    label: {
      label: 'Phone input',
    },
    mask: '+1 999 999 9999',
    maskChar: '_',
    placeholder: '+1 ___ ___ ____',
  },
}
