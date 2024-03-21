/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Text } from '@peiko/components/Text'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Data display/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { story: { height: '150px' } },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    position: 'bottom left',
    on: 'hover',
    trigger: <FilledButton>Hover Me</FilledButton>,
    renderMenu: () => <Text>Tooltip Content</Text>,
    maxWidth: '200px',
  },
}

// export const WithInput: Story = {
//   args: {
//     position: 'bottom center',
//     on: 'focus',
//     trigger: (
//       <Input
//         label={{ label: 'Input with info' }}
//         placeholder="Enter"
//         width={300}
//         name="test-tooltip"
//       />
//     ),
//     renderMenu: () => <Text>Tooltip Content</Text>,
//     maxWidth: '200px',
//   },
// }
