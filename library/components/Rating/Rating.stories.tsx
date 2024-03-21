/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'

import { HeartIcon } from '../icons/HeartIcon'
import { HeartFilledIcon } from '../icons/HeartFilledIcon'
import { Rating } from './Rating'

const meta: Meta<typeof Rating> = {
  title: 'Inputs/Rating',
  component: Rating,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
  argTypes: {
    onChange: { action: 'onChange' },
    children: {
      description: 'ReactNode',
      type: { name: 'string', required: false }, // Setting required to true
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

/**
 * Rating component
 */
export const Default: Story = {
  args: {},
}

/**
 * Rating component with custom color
 */
export const WithColor: Story = {
  args: {
    color: 'main7',
  },
}

/**
 * Rating component with custom number of stars
 */
export const WithNumberOfStars: Story = {
  args: {
    numberOfStars: 3,
  },
}

/**
 * Rating component readonly mode
 */
export const Readonly: Story = {
  args: {
    readonly: true,
  },
}

/**
 * Rating component with size of icons
 */
export const WithSize: Story = {
  args: {
    size: 48,
  },
}

/**
 * Rating component with breakpoint sizes of icons
 */
export const WithBreakpointSize: Story = {
  args: {
    size: {
      xs: 14,
      sm: 20,
      md: 32,
    },
  },
}

/**
 * Rating component with custom icons
 */
export const WithCustomIcons: Story = {
  args: {
    emptyIcon: <HeartIcon />,
    fillIcon: <HeartFilledIcon />,
  },
}

/**
 * Rating component with fractions
 */
export const WithFractions: Story = {
  args: {
    initialValue: 1.5,
    allowFraction: true,
  },
}

/**
 * Rating component disabled
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
