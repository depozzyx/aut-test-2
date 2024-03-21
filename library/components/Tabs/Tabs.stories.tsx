/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Text } from '@peiko/components/Text'
import { Card } from '@peiko/components/Card'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Tabs>

/**
 * Tabs component
 */
export const Default: Story = {
  args: {
    tabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    children: [
      <Card key="1" fullWidth borderRadius={0}>
        <Text>Tab Content 1</Text>
      </Card>,
      <Card key="2" fullWidth borderRadius={0}>
        <Text>Tab Content 2</Text>
      </Card>,
      <Card key="3" fullWidth borderRadius={0}>
        <Text>Tab Content 3</Text>
      </Card>,
    ],
  },
}

/**
 * You can set active tab by passing `activeTab` prop. It's a number, starting from 1.
 */
export const ActiveTab: Story = {
  args: {
    activeTab: 2,
    tabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    children: [
      <Card key="1" fullWidth borderRadius={0}>
        <Text>Tab Content 1</Text>
      </Card>,
      <Card key="2" fullWidth borderRadius={0}>
        <Text>Tab Content 2</Text>
      </Card>,
      <Card key="3" fullWidth borderRadius={0}>
        <Text>Tab Content 3</Text>
      </Card>,
    ],
  },
}

/**
 * You can disable tabs by passing `disabled` prop.
 */
export const DisabledTab: Story = {
  args: {
    tabs: [{ label: 'Tab 1' }, { label: 'Tab 2', disabled: true }, { label: 'Tab 3' }],
    children: [
      <Card key="1" fullWidth borderRadius={0}>
        <Text>Tab Content 1</Text>
      </Card>,
      <Card key="2" fullWidth borderRadius={0}>
        <Text>Tab Content 2</Text>
      </Card>,
      <Card key="3" fullWidth borderRadius={0}>
        <Text>Tab Content 3</Text>
      </Card>,
    ],
  },
}
