import React from 'react'
import { Text } from '@peiko/components/Text'
import { Wrapper, Table } from './ReportTable.styled'
import { TReportTableProps } from './types'

export function ReportTable<K extends PropertyKey>({
  headers,
  rows,
  footerRows,
  footerStyles,
  headerStyles,
  rowStyles,
  caption,
  minWidth,
  styles,
  borderColor,
  vAlign = 'center',
}: TReportTableProps<K>): JSX.Element {
  return (
    <Wrapper $minWidth={minWidth} style={styles}>
      <Table $borderColor={borderColor || '#D2D5DC'}>
        {caption && (
          <caption style={{ captionSide: 'top', textAlign: 'left', marginBottom: 4 }}>
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={String(h.value)}
                style={{ width: h.width, textAlign: h.align, ...(headerStyles || {}) }}
              >
                <Text variant="f10" color="base">
                  {h.label}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, rowIndex) => {
            const baseKey = headers.map((h) => r[h.value as keyof typeof r]).join('|')
            const perRowStyle =
              typeof rowStyles === 'function' ? rowStyles(r, rowIndex) : rowStyles || {}
            return (
              <tr key={baseKey}>
                {headers.map((h) => (
                  <td
                    key={String(h.value)}
                    style={{
                      width: h.width,
                      textAlign: h.align || 'left',
                      verticalAlign: vAlign as any,
                      ...perRowStyle,
                    }}
                  >
                    {r[h.value as keyof typeof r]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
        {footerRows && footerRows.length > 0 && (
          <tfoot>
            {footerRows.map((r) => {
              const baseKey = headers.map((h) => r[h.value as keyof typeof r]).join('|')
              return (
                <tr key={`f-${baseKey}`}>
                  {headers.map((h) => (
                    <td
                      key={String(h.value)}
                      style={{
                        width: h.width,
                        textAlign: h.align || 'left',
                        verticalAlign: vAlign as any,
                        ...(footerStyles || {}),
                      }}
                    >
                      {r[h.value as keyof typeof r]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tfoot>
        )}
      </Table>
    </Wrapper>
  )
}
