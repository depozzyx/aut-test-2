/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { CenteredNumberInput } from './CenteredNumberInput'

const meta: Meta<typeof CenteredNumberInput> = {
  title: 'Inputs/CenteredNumberInput',
  component: CenteredNumberInput,
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
    name: {
      description: 'The name of the input.',
      type: { name: 'string', required: true }, // Setting required to true
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof CenteredNumberInput>

export const Default: Story = {
  args: {
    name: 'label',
    placeholder: 'Type number',
  },
}

export const WithLabel: Story = {
  args: {
    name: 'label',
    placeholder: 'Type number',
    label: {
      label: 'Number input',
    },
  },
}

/**
 * Number input is controlled component. You can set value by passing `value` prop.
 */
export const WithValue: Story = {
  args: {
    name: 'label',
    value: 10,
    placeholder: 'Type number',
    label: {
      label: 'Number input',
    },
  },
}

/**
 * Define size of the input by passing `size` prop.
 */
export const WithSize: Story = {
  name: 'Small',
  args: {
    size: 's',
    label: {
      label: 'Small input',
    },
    placeholder: 'Type number',
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
    placeholder: 'Type number',
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    label: {
      label: 'Disabled input',
    },
    placeholder: 'Type number',
  },
}

/**
 * You can hide controls by passing `hideControls` prop.
 */
export const WithoutControls: Story = {
  args: {
    name: 'label',
    value: 10,
    placeholder: 'Type number',
    label: {
      label: 'Number input',
    },
    hideControls: true,
  },
}

export const WithError: Story = {
  name: 'With error',
  args: {
    name: 'error',
    label: {
      label: 'Error input',
    },
    value: 10,
    error: 'Error message',
    placeholder: '',
  },
}
