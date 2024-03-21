import { StoryObj, Meta } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: { story: { height: '250px' } },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    name: 'select',
    width: 300,
    options: [
      { label: 'Option 1', value: 'test' },
      { label: 'Option 2', value: 'test2' },
      { label: 'Option 3', value: 'test3' },
    ],
  },
}

export const Searchable: Story = {
  args: {
    name: 'select',
    width: 300,
    isSearchable: true,
    options: [
      { label: 'Option 1', value: 'test' },
      { label: 'Option 2', value: 'test2' },
      { label: 'Option 3', value: 'test3' },
    ],
  },
}

export const WithLabel: Story = {
  args: {
    name: 'select',
    width: 300,
    size: 's',
    label: { label: 'Select with Label' },
    options: [
      { label: 'Option 1', value: 'test' },
      { label: 'Option 2', value: 'test2' },
      { label: 'Option 3', value: 'test3' },
    ],
  },
}

export const WithSize: Story = {
  args: {
    name: 'select',
    width: 300,
    size: 's',
    options: [
      { label: 'Option 1', value: 'test' },
      { label: 'Option 2', value: 'test2' },
      { label: 'Option 3', value: 'test3' },
    ],
  },
}

export const WithError: Story = {
  args: {
    name: 'select',
    label: { label: 'Select with Error' },
    width: 300,
    error: 'Error message',
    options: [
      { label: 'Option 1', value: 'test' },
      { label: 'Option 2', value: 'test2' },
      { label: 'Option 3', value: 'test3' },
    ],
  },
}
