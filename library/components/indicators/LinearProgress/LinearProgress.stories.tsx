/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { LinearProgress } from './LinearProgress'

/**
 * Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.
 *
 * Linear progress is a component that shows progress in a line
 */
const meta: Meta<typeof LinearProgress> = {
  title: 'Feedback/indicators/LinearProgress',
  component: LinearProgress,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof LinearProgress>

/**
 * Linear progress is a component that shows progress in a circle
 */
export const Default: Story = {
  args: {
    width: 300,
    progress: 60,
  },
}

/**
 * Adjust progress and sizes
 */
export const WithParameters: Story = {
  args: {
    width: 350,
    height: 8,
    borderRadius: 4,
    progress: 80,
  },
}
