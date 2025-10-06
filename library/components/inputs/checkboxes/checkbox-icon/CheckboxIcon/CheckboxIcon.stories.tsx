import { StoryObj, Meta } from '@storybook/react'
import { HeartFilledIcon } from '@peiko/components/icons/HeartFilledIcon'
import { HeartIcon } from '@peiko/components/icons/HeartIcon'
import { CheckboxIcon } from './CheckboxIcon'

const meta: Meta<typeof CheckboxIcon> = {
  title: 'Inputs/CheckboxIcon',
  component: CheckboxIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    name: {
      description: 'The name of the input.',
      type: { name: 'string', required: true }, // Setting required to true
      control: 'text',
    },
    icon: {
      description: 'Unchecked icon component',
      type: { name: 'string', required: true }, // Setting required to true
      control: 'json',
    },
    checkedIcon: {
      description: 'Checked icon component',
      type: { name: 'string', required: true }, // Setting required to true
      control: 'json',
    },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxIcon>

/**
 * Checkbox icon component
 */
export const Default: Story = {
  args: {
    name: 'checkbox',
    icon: <HeartIcon />,
    checkedIcon: <HeartFilledIcon />,
  },
}

/**
 * Checkbox icon component with size
 */
export const WithSize: Story = {
  args: {
    name: 'checkbox',
    size: 'l',
    icon: <HeartIcon />,
    checkedIcon: <HeartFilledIcon />,
  },
}

/**
 * Checkbox icon component with breakpoints sizes
 */
export const WithBreakpointSize: Story = {
  args: {
    name: 'checkbox',
    sizes: {
      xs: 's',
      sm: 'm',
      md: 'l',
    },
    icon: <HeartIcon />,
    checkedIcon: <HeartFilledIcon />,
  },
}

/**
 * Checkbox icon component with error
 */
export const WithLabel: Story = {
  args: {
    name: 'toggle',
    label: 'Checkbox icon label',
    icon: <HeartIcon />,
    checkedIcon: <HeartFilledIcon />,
  },
}

/**
 * Checkbox icon component disabled
 */
export const Disabled: Story = {
  args: {
    name: 'toggle',
    label: 'Checkbox disabled',
    disabled: true,
    icon: <HeartIcon />,
    checkedIcon: <HeartFilledIcon />,
  },
}
