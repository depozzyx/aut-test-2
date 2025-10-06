/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Text } from '@peiko/components/Text'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { BodyCell, HeaderCell } from '@peiko/components/Table'
import { TreeTable } from './TreeTable'
import { TTreeRow } from './types'
import { THeader } from '../Table/types'

const meta: Meta<typeof TreeTable> = {
  title: 'Data display/TreeTable',
  component: TreeTable,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TreeTable>

type Row = {
  id: string
  name: React.ReactNode
  status: React.ReactNode
  amount: React.ReactNode
}

const headerData: Array<THeader<keyof Row>> = [
  { value: 'name', label: <Text variant="f6">Name</Text>, width: '280px' },
  { value: 'status', label: 'Status' },
  { value: 'amount', label: 'Amount' },
]

const makeRow = (label: string): Row => ({
  id: Math.random().toString(),
  name: <Text variant="f7">{label}</Text>,
  status: <Text variant="f7">Active</Text>,
  amount: <Text variant="f7">$100</Text>,
})

const rows: Array<TTreeRow<Row>> = [
  {
    ...makeRow('Root A'),
    children: [
      { ...makeRow('A-1') },
      {
        ...makeRow('A-2'),
        children: [{ ...makeRow('A-2-1') }, { ...makeRow('A-2-2') }],
      },
    ],
  },
  {
    ...makeRow('Root B'),
    children: [{ ...makeRow('B-1') }, { ...makeRow('B-2') }],
  },
]

export const Default: Story = {
  args: {
    headerData,
    rows,
    indent: 16,
    bodyCell: (props) => <BodyCell {...props} whiteSpace="nowrap" />,
    headerCell: (props) => <HeaderCell {...props} whiteSpace="nowrap" />,
    buttonCollapse: ({ isOpen, onClick }) => (
      <IconButton onClick={onClick}>
        <ArrowIcon direction={isOpen ? 'down' : 'up'} />
      </IconButton>
    ),
  },
}

export const WithLoading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}

export const WithCustomWidths: Story = {
  args: {
    ...Default.args,
    headerData: [
      { value: 'name', label: <Text variant="f6">Name</Text>, width: '360px' },
      { value: 'status', label: 'Status', width: '200px' },
      { value: 'amount', label: 'Amount' },
    ] as Array<THeader<keyof Row>>,
  },
}
