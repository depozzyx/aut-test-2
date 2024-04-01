/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import { HorizontalScroll } from './HorizontalScroll'

const meta: Meta<typeof HorizontalScroll> = {
  title: 'Data display/HorizontalScroll',
  component: HorizontalScroll,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HorizontalScroll>

/**
 *
 * This component accept all props from [react-indiana-drag-scroll](https://github.com/norserium/react-indiana-drag-scroll#readme)
 */
export const Default: Story = {
  args: {
    children: [1, 2, 3, 4, 5, 6, 7].map((number) => (
      <Card key={number} bgColor="base2" padding={124} borderRadius={8}>
        <Text variant="f6" styles={{ whiteSpace: 'nowrap' }}>
          Card {number}
        </Text>
      </Card>
    )),
  },
}

/**
 *
 * This component accept all props from [react-indiana-drag-scroll](https://github.com/norserium/react-indiana-drag-scroll#readme)
 */
export const Draggable: Story = {
  args: {
    children: [1, 2, 3, 4, 5, 6, 7].map((number) => (
      <Card key={number} bgColor="base2" padding={124} borderRadius={8}>
        <Text variant="f6" styles={{ whiteSpace: 'nowrap' }}>
          Card {number}
        </Text>
      </Card>
    )),
  },
}

/**
 *
 * This component accept all props from [react-indiana-drag-scroll](https://github.com/norserium/react-indiana-drag-scroll#readme)
 */
export const WithScroll: Story = {
  args: {
    hideScrollbars: false,
    children: [1, 2, 3, 4, 5, 6, 7].map((number) => (
      <Card key={number} bgColor="base2" padding={124} borderRadius={8}>
        <Text variant="f6" styles={{ whiteSpace: 'nowrap' }}>
          Card {number}
        </Text>
      </Card>
    )),
  },
}
