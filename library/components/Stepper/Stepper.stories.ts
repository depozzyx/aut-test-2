import { StoryObj, Meta } from '@storybook/react'
import { Stepper } from './Stepper'

/**
 * Steppers display progress through a sequence of logical and numbered steps.
 *
 * Currently it's only supports `readonly` mode and `horizontal` orientation
 */
const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'List of steps labels',
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

/**
 * Stepper component
 */
export const Default: Story = {
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
  },
}

/**
 * Define the active step by passing the `activeStep` prop.
 * `activeStep` is 1-based
 */
export const WithActiveStep: Story = {
  args: {
    activeStep: 2,
    steps: ['Step 1 label', 'Step 2 label', 'Step 3 label'],
  },
}
