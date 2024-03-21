/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'

import { DayPicker } from './DayPicker'

const meta: Meta<typeof DayPicker> = {
  title: 'Data display/DayPicker',
  component: DayPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export default meta
type Story = StoryObj<typeof DayPicker>

export const Default: Story = {
  args: { value: new Date() },
}
