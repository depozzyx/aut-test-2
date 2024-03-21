/* eslint-disable no-alert */
import { StoryObj, Meta } from '@storybook/react'
import { DefaultTheme } from 'styled-components'
import { OutlinedChip } from './OutlinedChip'

const meta: Meta<typeof OutlinedChip> = {
  title: 'Data display/OutlinedChip',
  component: OutlinedChip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof OutlinedChip>

/**
 * Chip component
 */
export const Default: Story = {
  args: { children: 'Simple Chip' },
}

/**
 * Chip clickable component
 */
export const Clickable: Story = {
  args: { children: 'Clickable', onClick: () => alert('Clicked') },
}

/**
 * Chip with delete option
 */
export const WithDelete: Story = {
  args: { children: 'Deletable', onDelete: () => alert('Delete') },
}

/**
 * Chip with custom start adornment
 */
export const WithStartAdornment: Story = {
  args: { children: 'Hello', startAdornment: '👋' },
}

/**
 * Chip with custom  and adornment
 */
export const WithEndAdornment: Story = {
  args: { children: 'Hello', endAdornment: '👋' },
}

/**
 * Chip with custom size
 */
export const WithSize: Story = {
  args: {
    children: 'Large chip',
    size: 'l',
  },
}

/**
 * Chip with custom breakpoint sizes
 */
export const WithBreakpointSize: Story = {
  args: {
    children: 'Chip with breakpoint sizes',
    sizes: {
      xs: 's',
      md: 'l',
    },
  },
}

/**
 * Chip with custom styles
 */
export const WithStyles: Story = {
  args: {
    children: 'Hello',
    endAdornment: '👋',
    styles: {
      backgroundColor: (theme: DefaultTheme) => theme.palette.main7,
      color: 'white',
    },
  },
}
