import React, { useEffect, useRef, useState } from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import styled, { useTheme } from 'styled-components'
import { fonts } from '@peiko/styles/fonts'
import { cssStringToObject } from '@peiko/styles/utils/style-to-css'
import { Tooltip } from '@peiko/components/Tooltip'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { CopyIcon } from '@peiko/components/icons/CopyIcon'
import { TValidationErrors } from '../../types/files'

const StyledCopyIconWrapper = styled.div`
  display: inline-flex;
  transition: transform 150ms;
  &:hover {
    transform: scale(1.2);
  }
`

export const ImportErrorsModal = ({
  validationErrors,
  onClose,
}: {
  validationErrors: TValidationErrors[]
  onClose: () => void
}): JSX.Element => {
  const { t } = useTranslation('import-leads')
  const theme = useTheme()

  const { resetModals } = useModals()

  const onCloseModal = () => {
    resetModals()
    onClose()
  }

  function useEllipsisCheck(
    text: string,
    ref: React.MutableRefObject<HTMLElement | null>,
  ) {
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
      if (ref.current) {
        setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth)
      }
    }, [text])

    return [isOverflowing]
  }

  const TextWithTooltip = ({
    flex,
    text,
    tooltipText,
    styles = {},
  }: {
    flex: string | number | undefined
    text: string
    tooltipText: string
    styles?: React.CSSProperties
  }) => {
    const ref = useRef(null)
    const [isOverflowing] = useEllipsisCheck(text, ref)
    return (
      <div
        ref={ref}
        style={{
          flex,
          padding: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          ...styles,
          ...cssStringToObject(fonts.f8),
        }}
      >
        <Tooltip
          position="bottom center"
          on={isOverflowing ? ['hover', 'focus'] : []}
          mouseEnterDelay={400}
          keepTooltipInside
          contentBorderColor="main2"
          arrowBorderColor="main2"
          trigger={<span>{text}</span>}
          closeOnDocumentClick={false}
          zIndex={9999}
          renderMenu={() => (
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '150px',
                padding: '0 8px',
                ...cssStringToObject(fonts.f10),
              }}
            >
              {tooltipText}
            </div>
          )}
        />
      </div>
    )
  }

  return (
    <ModalMessage
      title={t('ImportErrorsModal.title')}
      description={t('ImportErrorsModal.description')}
      open
      disableCloseOutside
      onClose={onCloseModal}
      containerWidth="100%"
      maxWidth="80vh"
      left="106px"
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        styles={{
          marginTop: '10px',
          width: '100%',
        }}
      >
        <Flex styles={{ marginTop: '10px', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                background: theme.palette.main4,
                color: 'white',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  flex: 2,
                  padding: '8px',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('ImportErrorsModal.columns.property')}
                </Text>
              </div>
              <div
                style={{
                  flex: 4,
                  padding: '8px',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('ImportErrorsModal.columns.value')}
                </Text>
              </div>
              <div
                style={{
                  flex: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('ImportErrorsModal.columns.errors')}
                </Text>
              </div>
            </div>
            <div
              style={{
                maxHeight: '60vh',
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {validationErrors.map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.property}-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderBottom: `1px solid ${theme.palette.main22}`,
                    minWidth: 0,
                  }}
                >
                  <TextWithTooltip
                    flex={2}
                    text={item.property}
                    tooltipText={item.property}
                  />
                  <TextWithTooltip
                    styles={{ borderLeft: `1px solid ${theme.palette.main22}` }}
                    flex={4}
                    text={item.value}
                    tooltipText={item.value}
                  />
                  <Tooltip
                    on={['click']}
                    onOpen={() => {
                      navigator.clipboard.writeText(item.value)
                    }}
                    padding="4px 8px"
                    contentBackgroundColor="main3"
                    position="bottom center"
                    zIndex={9999}
                    liveTime={1000}
                    arrow={false}
                    closeOnDocumentClick={false}
                    trigger={
                      <BaseButton>
                        <StyledCopyIconWrapper>
                          <CopyIcon size="s" />
                        </StyledCopyIconWrapper>
                      </BaseButton>
                    }
                    renderMenu={() => (
                      <Text variant="f8" color="base">
                        {t('copied to clipboard')}
                      </Text>
                    )}
                  />

                  <TextWithTooltip
                    flex={6}
                    styles={{
                      borderLeft: `1px solid ${theme.palette.main22}`,
                      marginLeft: '8px',
                    }}
                    text={Object.values(item.constraints).join(', ')}
                    tooltipText={Object.values(item.constraints).join(', ')}
                  />
                </div>
              ))}
            </div>
          </div>
        </Flex>
        <Flex justify="space-between" gap="24px" margin="48px 0 0">
          <OutlinedButton
            styles={{ minWidth: '250px' }}
            onClick={() => onCloseModal()}
            width="100%"
          >
            {t('UnknownStatusModal.buttons.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </ModalMessage>
  )
}
