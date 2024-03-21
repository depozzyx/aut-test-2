/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { FilledAccordion as AccordionComponent } from './FilledAccordion'

const meta: Meta<typeof AccordionComponent> = {
  title: 'Surfaces/FilledAccordion',
  component: AccordionComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export default meta
type Story = StoryObj<typeof AccordionComponent>

export const Default: Story = {
  args: {
    children: (
      <Text variant="f7">
        Content of the accordion. The exchanger is fully automatic. You can make exchanges
        24/7/365. Payment is made instantly after crediting your funds to our wallet.
        Information about the status of the request is updated on the payment page and
        duplicated to your e-mail.
      </Text>
    ),
    header: ({ isOpen }) => (
      <Card
        styles={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        padding="0"
        fullWidth
      >
        <Text variant="f4">Filled Accordion Header</Text>
        <ArrowIcon
          direction={isOpen ? 'down' : 'up'}
          color={isOpen ? 'main2' : 'main8'}
        />
      </Card>
    ),
  },
}
