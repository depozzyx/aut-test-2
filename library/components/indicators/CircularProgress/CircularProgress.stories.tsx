/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { CircularProgress } from './CircularProgress'

/**
 * Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.
 *
 * Circular progress is a component that shows progress in a circle
 */
const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback/indicators/CircularProgress',
  component: CircularProgress,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof CircularProgress>

/**
 * Circular progress is a component that shows progress in a circle
 */
export const Default: Story = {
  args: {
    size: 56,
    borderWidth: 5,
    progress: 60,
  },
}

/**
 * Adjust progress and sizes
 */
export const WithParameters: Story = {
  args: {
    size: 100,
    borderWidth: 10,
    progress: 32,
  },
}
