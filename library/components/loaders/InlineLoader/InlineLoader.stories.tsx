import { StoryObj, Meta } from '@storybook/react'

import { InlineLoader } from './InlineLoader'

const meta: Meta<typeof InlineLoader> = {
  title: 'Feedback/loaders/InlineLoader',
  component: InlineLoader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof InlineLoader>

export const Default: Story = {
  args: { loading: true },
}

export const WithCustomprops: Story = {
  args: { loading: true, color: 'base2', height: 8, borderRadius: 4 },
}

export const Fixed: Story = {
  args: { loading: true, position: 'fixed', width: '100%' },
}
