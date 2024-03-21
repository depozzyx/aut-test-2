/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Card } from '@peiko/components/Card'
import { Box } from './Box'

/**
 * The Box component is a generic container with access to `styles` utility
 */
const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Box>

/**
 * Box is general div component
 */
export const Default: Story = {
  args: {
    children: 'Content',
  },
}

/**
 * You can pass any styles to the component via styles prop
 */
export const WithStyles: Story = {
  args: {
    children: 'Content',
    styles: {
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      ':hover': {
        cursor: 'pointer',
        backgroundColor: 'blue',
      },
    },
  },
}

/**
 * You can use Box as container for elements
 *
 * It's behaves like Box component from Material UI but with styles [Box Api](https://mui.com/material-ui/react-box/)
 */
export const FlexContainer: Story = {
  args: {
    children: (
      <>
        <Card>Child 1</Card>
        <Card>Child 2</Card>
        <Card>Child 3</Card>
      </>
    ),
    styles: {
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
  },
}
