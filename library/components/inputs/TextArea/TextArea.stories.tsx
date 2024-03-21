import { StoryObj, Meta } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Inputs/TextArea',
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    name: 'textarea-name',
    placeholder: 'Placeholder',
    label: {
      label: 'Label',
    },
  },
}

export const WithResize: Story = {
  args: {
    resize: true,
    name: 'textarea-name',
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
      label: 'Small textarea',
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
      label: 'Disabled textarea',
    },
    placeholder: 'Placeholder',
  },
}

export const WithError: Story = {
  name: 'Error',
  args: {
    name: 'error',
    label: {
      label: 'Error textarea',
    },
    error: 'Error message',
    placeholder: '',
  },
}
