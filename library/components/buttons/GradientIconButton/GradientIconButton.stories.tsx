import { StoryObj, Meta } from '@storybook/react'
import { CopyIcon } from '@peiko/components/icons/CopyIcon'
import { GradientIconButton } from './GradientIconButton'

const meta: Meta<typeof GradientIconButton> = {
  title: 'Buttons/Icon buttons/GradientIconButton',
  component: GradientIconButton,
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
      description: 'Button Icon. Valid any React Element',
      control: {
        type: 'json',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GradientIconButton>

export const Default: Story = {
  args: {
    children: <CopyIcon />,
  },
}

export const Active: Story = {
  args: {
    children: <CopyIcon />,
    active: true,
  },
}

export const Loading: Story = {
  args: {
    children: <CopyIcon />,
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: <CopyIcon />,
    disabled: true,
  },
}

export const WithSize: Story = {
  args: {
    children: <CopyIcon />,
    size: 's',
  },
}

export const WithBreakpointSize: Story = {
  args: {
    children: <CopyIcon />,
    size: {
      xs: 's',
      sm: 's',
      md: 'l',
    },
  },
}

export const NextLink: Story = {
  args: {
    children: <CopyIcon />,
    link: {
      href: '/test',
    },
  },
}

export const ExternalLink: Story = {
  args: {
    children: <CopyIcon />,
    externalLink: {
      href: 'https://google.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  },
}

export const WithCustomStyles: Story = {
  args: {
    children: <CopyIcon />,
    styles: {
      background: 'red',
      '&:hover': {
        background: 'blue',
      },
    },
  },
}
