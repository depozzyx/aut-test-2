import { StoryObj, Meta } from '@storybook/react'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Inputs/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    name: 'slider',
    max: 100,
    min: 0,
    width: 300,
    defaultValues: [50],
  },
}

export const Range: Story = {
  args: {
    name: 'slider',
    max: 100,
    min: 0,
    width: 300,
    defaultValues: [1, 50],
  },
}
