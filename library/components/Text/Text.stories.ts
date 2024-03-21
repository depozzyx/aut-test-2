import type { Meta, StoryObj } from '@storybook/react'

import { Text } from './Text'

/**
 * Text is a component that renders text with a specified font variant from the theme
 */
const meta: Meta<typeof Text> = {
  title: 'Data display/Text',
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof Text>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Some text',
  },
}

export const Large: Story = {
  args: {
    variant: 'f1',
    children: 'f1 Heading',
  },
}

export const Small: Story = {
  args: {
    variant: 'f5',
    children: 'f5 Text',
  },
}

export const WithBreakpointSizes: Story = {
  args: {
    variant: {
      xs: 'f1',
      sm: 'f2',
      md: 'f3',
      lg: 'f4',
    },
    children: 'Breakpoint Text',
  },
}

export const WithCustomStyles: Story = {
  args: {
    variant: 'f3',
    children: 'With custom styles',
    styles: {
      color: (theme) => theme.palette.main2,
      ':hover': {
        cursor: 'pointer',
      },
    },
  },
}
