/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Adaptive } from './Adaptive'

const meta: Meta<typeof Adaptive> = {
  title: 'Layout/Adaptive',
  component: Adaptive,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Adaptive>

/**
 * Default component
 */
export const Default: Story = {
  args: {
    visible: 'none',
    children: 'Hidden on all screens',
  },
}

/**
 * Hidden on mobile
 */
export const HideMobile: Story = {
  args: {
    visible: {
      xs: 'none',
      md: 'block',
    },
    children: 'Hidden on mobile. Visible on desktop',
  },
}

/**
 * Hide on desktop
 */

export const HideDesktop: Story = {
  args: {
    visible: {
      lgDown: 'none',
      smDown: 'block',
    },
    children: 'Hidden on desktop. Visible on mobile',
  },
}
