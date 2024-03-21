import { StoryObj, Meta } from '@storybook/react'
import { BreadCrumbs } from './BreadCrumbs'

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Navigation/BreadCrumbs',
  component: BreadCrumbs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: { maxItems: { control: 'number' } },
}

export default meta

type Story = StoryObj<typeof BreadCrumbs>

export const Default: Story = {
  args: {
    list: [
      { label: 'Home', href: '/home' },
      { label: 'Current page', href: '/current-page', active: true },
    ],
  },
}

/**
 * Set active link for current page. Active link becomes a text instead of a link
 */
export const WithActiveLinks: Story = {
  args: {
    list: [
      { label: 'Home', href: '/home' },
      { label: 'Current page', href: '/current-page', active: true },
    ],
  },
}

/**
 * Set max amount of pages to show.
 */
export const WithMaxPages: Story = {
  args: {
    maxItems: 2,
    list: [
      { label: 'First page', href: '/1' },
      { label: 'Second page', href: '/2' },
      { label: 'Last page', href: '/3' },
    ],
  },
}
