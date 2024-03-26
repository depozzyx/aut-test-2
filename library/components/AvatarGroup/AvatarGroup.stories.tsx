/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Text } from '@peiko/components/Text'
import { AvatarGroup } from './AvatarGroup'
import image from './images/avatar-test.jpg'

const meta: Meta<typeof AvatarGroup> = {
  title: 'Data display/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

/**
 * AvatarGroup component
 */
export const Default: Story = {
  args: {
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
    total: 6,
  },
}

/**
 * AvatarGroup component with total avatars
 */
export const WithBigTotal: Story = {
  args: {
    total: 6123,
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
  },
}

/**
 * AvatarGroup component with max 2 elements
 */
export const WithMax: Story = {
  args: {
    max: 2,
    total: 6,
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
  },
}

/**
 * AvatarGroup component with the surplus
 */
export const RenderSurplus: Story = {
  args: {
    renderSurplus: (surplus) => <Text color="base">[{surplus}]</Text>,
    total: 6,
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
  },
}

/**
 * AvatarGroup component with spacing
 */
export const WithSpacing: Story = {
  args: {
    spacing: {
      xs: -10,
      md: -20,
    },
    total: 6,
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
  },
}

/**
 * AvatarGroup component with the custom bg
 */
export const CustomBg: Story = {
  args: {
    defaultAvatarBg: 'base',
    total: 6,
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
  },
}

/**
 * AvatarGroup component with the avatar size
 */
export const WithAvatarSize: Story = {
  args: {
    avatarSize: 60,
    total: 6,
    avatars: [
      { alt: 'Test Testovich1', src: image.src },
      { alt: 'Test Testovich2', src: image.src },
      { alt: 'Test Testovich3', src: image.src },
      { alt: 'Test Testovich12', src: image.src },
      { alt: 'Test Testovich22', src: image.src },
      { alt: 'Test Testovich32', src: image.src },
    ],
  },
}
