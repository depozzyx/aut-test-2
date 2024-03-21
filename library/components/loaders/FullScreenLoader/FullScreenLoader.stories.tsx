/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { FullScreenLoader } from './FullScreenLoader'

/**
 * FullScreenLoader component.
 *
 * Used to display a full screen loader. Suitable for loading pages or entire site
 */
const meta: Meta<typeof FullScreenLoader> = {
  title: 'Feedback/loaders/FullScreenLoader',
  component: FullScreenLoader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
    docs: { story: { height: '400px' } },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof FullScreenLoader>

/**
 * FullScreenLoader component
 */
export const Default: Story = {
  args: {
    fixScroll: false,
  },
}
