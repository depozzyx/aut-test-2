/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Skeleton } from './Skeleton'

/**
 * The data for your components might not be immediately available.
 *
 * You can improve the perceived responsiveness of the page by using skeletons.
 *
 * It feels like things are happening immediately, then the information is incrementally displayed on the screen
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Skeleton>

/**
 * Skeleton useful when content is not loaded
 */
export const Default: Story = {
  args: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
}

/**
 * You can adjust the size and color of the skeleton
 */
export const Customizable: Story = {
  args: {
    width: '100%',
    height: 20,
    borderRadius: 4,
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
}
