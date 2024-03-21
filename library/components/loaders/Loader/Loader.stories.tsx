/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'

import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
  title: 'Feedback/loaders/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {},
}

export const WithColor: Story = {
  args: {
    color: 'main2',
  },
}

/**
 * You can set size for Loader
 */
export const WithSize: Story = {
  args: {
    size: 's',
  },
}

/**
 * You can set custom dimensions for Loader
 * If you set width and height, size will be ignored
 */
export const WithDimensions: Story = {
  args: {
    color: 'main2',
    width: '48px',
    height: '48px',
  },
}

/**
 * Loader with label
 */
export const WithLabel: Story = {
  args: {
    label: 'Loading...',
  },
}

/**
 * Loader with label label placement
 */
export const WithLabelPlacement: Story = {
  args: {
    label: 'Loading...',
    labelPlacement: 'left',
  },
}
