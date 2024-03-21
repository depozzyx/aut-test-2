import { StoryObj, Meta } from '@storybook/react'
import { CopyIcon } from '@peiko/components/icons/CopyIcon'
import { GradientButton } from './GradientButton'

const meta: Meta<typeof GradientButton> = {
  title: 'Buttons/GradientButton',
  component: GradientButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  args: { size: 'm' },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    children: {
      description: 'Button content. Valid any React Element',
      control: {
        type: 'text',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GradientButton>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Active: Story = {
  args: {
    children: 'Button',
    active: true,
  },
}

export const Loading: Story = {
  args: {
    children: 'Button',
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
}

export const WithSize: Story = {
  args: {
    children: 'Large Button',
    size: 'l',
  },
}

export const WithBreakpointSize: Story = {
  args: {
    children: 'Copy',
    size: {
      xs: 's',
      sm: 's',
      md: 'l',
    },
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Copy',
    endIcon: <CopyIcon />,
  },
}

export const NextLink: Story = {
  args: {
    children: 'Next link',
    link: {
      href: '/test',
    },
  },
}

export const ExternalLink: Story = {
  args: {
    children: 'External link',
    externalLink: {
      href: 'https://google.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  },
}

export const WithCustomStyles: Story = {
  args: {
    children: 'Styled button',
    styles: {
      background: 'red',
      '&:hover': {
        background: 'blue',
      },
    },
  },
}
