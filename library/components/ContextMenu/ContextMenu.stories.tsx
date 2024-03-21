/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Text } from '@peiko/components/Text'
import { ContextMenu } from './ContextMenu'
import { FilledButton } from '../buttons/FilledButton'

const meta: Meta<typeof ContextMenu> = {
  title: 'Data display/ContextMenu',
  component: ContextMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  args: {
    position: 'bottom left',
    on: 'hover',
    trigger: <FilledButton>Hover Me</FilledButton>,
    renderMenu: () => <Text>ContextMenu Content</Text>,
  },
}

export const Clickable: Story = {
  args: {
    position: 'bottom left',
    on: 'click',
    trigger: <FilledButton>Click Me</FilledButton>,
    renderMenu: () => <Text>ContextMenu Content</Text>,
  },
}

export const WithOffset: Story = {
  args: {
    position: 'bottom left',
    on: 'hover',
    offsetY: 10,
    offsetX: 10,
    trigger: <FilledButton>Hover Me</FilledButton>,
    renderMenu: () => <Text>ContextMenu Content</Text>,
  },
}

export const WithAutofocusDisabled: Story = {
  args: {
    position: 'bottom left',
    on: 'hover',
    offsetY: 10,
    offsetX: 10,
    disableAutoFocus: true,
    trigger: <FilledButton>Hover Me</FilledButton>,
    renderMenu: () => <Text>ContextMenu Content</Text>,
  },
}

export const WithBodyScrollDisabled: Story = {
  args: {
    position: 'bottom left',
    on: 'hover',
    offsetY: 10,
    offsetX: 10,
    fixScroll: true,
    disableAutoFocus: true,
    trigger: <FilledButton>Hover Me</FilledButton>,
    renderMenu: () => <Text>ContextMenu Content</Text>,
  },
}
