import { StoryObj, Meta } from '@storybook/react'

import { Card } from './Card'

/**
 * Cards in general are simple surfaces that display some content or actions on a single topic
 */
const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      description: 'Card content. Valid any React Element',
      control: {
        type: 'text',
      },
    },
    key: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
}

/**
 * You can add custom props to the component
 * such as borderRadius, padding, margin, etc.
 */
export const WithCustomprops: Story = {
  name: 'With custom props',
  args: {
    children: 'Card content',
    borderRadius: 10,
    padding: 54,
    margin: 20,
  },
}

/**
 * You can add custom props to the component for each breakpoint
 */
export const WithCustomBreakpointProps: Story = {
  name: 'With custom breakpoints props',
  args: {
    children: 'Styled Card content',
    xs: {
      borderRadius: 8,
      padding: 24,
    },
    sm: {
      borderRadius: 20,
      padding: 64,
    },
  },
}

/**
 * You can add custom props to the component via styles object
 */
export const WithCustomStyles: Story = {
  args: {
    children: 'Styled Card content',
    styles: {
      background: (theme) => theme.palette.main2,
      borderRadius: '18px',
    },
    xs: {
      padding: 24,
    },
  },
}
