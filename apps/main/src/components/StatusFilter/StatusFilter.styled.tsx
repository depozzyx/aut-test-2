import styled, { css } from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FiltersIcon } from '@peiko/components/icons/FiltersIcon'

export const CustomFilterBtn = styled((props) => {
  const { t } = useTranslation('common')
  const { title, ...rest } = props

  return (
    <FilledButton size="s" endIcon={<FiltersIcon />} {...rest}>
      {title ?? t('status')}
    </FilledButton>
  )
})(
  ({ theme }) => css`
    border-radius: 4px !important;
    background-color: ${theme.palette.base};
    color: ${theme.palette.main4};
    border: 1px solid ${theme.palette.main10};
    ${theme.fonts.f8}

    svg {
      width: 24px !important;
      height: 24px !important;

      path {
        fill: ${theme.palette.main4};
      }
    }
  `,
)
