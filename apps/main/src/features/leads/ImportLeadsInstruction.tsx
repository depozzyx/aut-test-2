import { Flex } from '@/components/Flex'
import { Box } from '@peiko/components/Box'
import { Card } from '@peiko/components/Card'
import { BodyCell, HeaderCell, Table } from '@peiko/components/Table'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { ROUTES } from '@/constants/routes'
import { FileIcon2 } from '@/icons/FileIcon2'
import { ResizeIcon } from '@/icons/ResizeIcon'
import { DataIcon } from '@/icons/DataIcon'
import { InfoColumn } from './components/InfoColumn'

type TDataKeys = 'name' | 'phone' | 'timezone' | 'status' | 'source' | 'id'

const DATA_TITLES: { label: string; value: TDataKeys }[] = [
  { label: 'Lead Name', value: 'name' },
  { label: 'Lead Phone', value: 'phone' },
  { label: 'Lead Timezone', value: 'timezone' },
  { label: 'Lead Status', value: 'status' },
  { label: 'Source', value: 'source' },
]

const DATA_EXAMPLE: {
  [key in TDataKeys]: string
}[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    timezone: 'UTC -5',
    status: 'active',
    source: 'Website',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1234567987',
    timezone: 'UTC +5',
    status: 'active',
    source: 'Email Campaign',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    phone: '+1234590987',
    timezone: 'UTC +1',
    status: 'inactive',
    source: 'Direct Call',
  },
]

const LIST = [
  {
    label: 'instructions.fileFormat',
    value: 'CSV, XLS',
    icon: <FileIcon2 />,
  },
  {
    label: 'instructions.fileSize',
    value: 'Up to 20Mb',
    icon: <ResizeIcon />,
  },
  {
    label: 'instructions.fileData',
    value: 'Example',
    icon: <DataIcon />,
    data: {
      heads: DATA_TITLES,
      rows: DATA_EXAMPLE,
    },
  },
]

export const ImportLeadsInstruction: FC = () => {
  const { t } = useTranslation('import-leads')

  const rows = (
    data: {
      [key in TDataKeys]: string
    }[],
  ) =>
    data.map((item) => ({
      row: {
        id: item.id,
        name: <InfoColumn title={item.name} />,
        phone: <InfoColumn title={item.phone} />,
        timezone: <InfoColumn title={item.timezone} />,
        status: <InfoColumn title={item.status} />,
        source: <InfoColumn title={item.source} />,
      },
    }))

  return (
    <Card padding="24px 40px" maxWidth="876px" fullWidth margin="41px auto">
      <Text variant="f2" styles={{ marginBottom: '40px', textAlign: 'center' }}>
        {t('instructions.title')}
      </Text>
      <Flex direction="column" gap="12px">
        {LIST.map(({ label, value, data, icon }) => (
          <Card key={label} padding="14px 16px" fullWidth>
            <Box
              styles={{
                display: 'grid',
                gridTemplateColumns: '117px 1fr',
                gap: '10px',
                marginBottom: data ? '10px' : '0px',
                alignItems: 'center',
              }}
            >
              <Flex align="center" gap="10px">
                {icon}
                <Text color="main5" variant="f9" styles={{ lineHeight: '20px' }}>
                  {t(label)}
                </Text>
              </Flex>
              <Text color="main5" variant="f8" styles={{ lineHeight: '20px' }}>
                {value}
              </Text>
            </Box>
            {data && (
              <Table
                headerData={data?.heads}
                rowsData={rows(data.rows)}
                bodyCell={(props) => (
                  <BodyCell {...props} whiteSpace="nowrap" bg="base2" />
                )}
                headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
              />
            )}
          </Card>
        ))}
      </Flex>
      <Box styles={{ margin: '40px auto 0', width: 'fit-content' }}>
        <FilledButton width="236px" link={{ href: ROUTES.IMPORT_LEADS }}>
          {t('instructions.importLink')}
        </FilledButton>
      </Box>
    </Card>
  )
}
