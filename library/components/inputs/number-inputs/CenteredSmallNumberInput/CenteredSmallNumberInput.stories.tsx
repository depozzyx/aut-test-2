/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { CenteredSmallNumberInput } from './CenteredSmallNumberInput'

const meta: Meta<typeof CenteredSmallNumberInput> = {
  title: 'Inputs/CenteredSmallNumberInput',
  component: CenteredSmallNumberInput,
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
type Story = StoryObj<typeof CenteredSmallNumberInput>

export const Default: Story = {
  args: {
    name: 'label',
    width: '67px',
    value: 1,
  },
}

/**
 * Define size of the input by passing `size` prop.
 */
export const WithSize: Story = {
  name: 'Small',
  args: {
    size: 's',
    value: 1,
    width: '67px',
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
    value: 1,
    width: '67px',
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    value: 1,
    width: '67px',
  },
}

/**
 * You can hide controls by passing `hideControls` prop.
 */
export const WithoutControls: Story = {
  args: {
    name: 'label',
    value: 10,
    hideControls: true,
    width: '67px',
  },
}
