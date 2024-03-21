import { StoryObj, Meta } from '@storybook/react'
import { DayPickerInput } from './DayPickerInput'

const meta: Meta<typeof DayPickerInput> = {
  title: 'Inputs/DayPickerInput',
  component: DayPickerInput,
  parameters: {
    layout: 'centered',
    docs: { story: { height: '400px' } },
  },

  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DayPickerInput>

export const Default: Story = {
  args: {
    name: 'test-date',
  },
  parameters: { docs: { story: { height: '400px' } } },
}

export const WithFormat: Story = {
  args: {
    name: 'date-frmat',
    dateFormat: 'dd.MM.yyyy',
  },
}

export const WithLabel: Story = {
  args: {
    label: { label: 'Day input' },
    name: 'date-label',
  },
}

/**
 * Control size of the input
 */
export const WithSize: Story = {
  args: {
    label: { label: 'Day input' },
    size: 's',
    name: 'date-2',
  },
}

export const WithBreakpointSize: Story = {
  args: {
    label: { label: 'Day input' },
    size: {
      xs: 's',
      sm: 'm',
    },
    name: 'date-3',
  },
}

export const WithError: Story = {
  args: {
    label: { label: 'Day input' },
    error: 'Invalid date',
    name: 'date-error',
  },
}
