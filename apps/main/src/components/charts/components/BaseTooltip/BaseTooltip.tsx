/* eslint-disable */
import { memo } from 'react'
import { useTheme } from 'styled-components'
import { deepEqual } from '@peiko/utils/deep-equal'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { TTooltipProps } from '../../types'
import { getXaxisDate } from '../../utils'

export const BaseTooltip = memo<TTooltipProps>(({ payload, active, ...props }) => {
  const theme = useTheme()
  return (
    <>
      {active && payload && payload.length && (
        <div
          className="tooltip"
          style={{
            backgroundColor: theme.palette.base4,
            padding: '6px',
            borderRadius: '4px',
          }}
        >
          <Box className="tooltip__header">
            <Text variant="f10">{getXaxisDate(payload[0].payload.date)}</Text>
          </Box>
          <Box className="tooltip__body">
            {payload.map((item, index) => (
              <Box key={index} className="tooltip__item">
                <Box className="tooltip__item__value" styles={{ display: 'flex' }}>
                  <Text
                    variant="f10"
                    color="main3"
                  >{`${item.dataKey}: ${item.value}`}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </>
  )
}, deepEqual)

BaseTooltip.displayName = 'BaseTooltip'
