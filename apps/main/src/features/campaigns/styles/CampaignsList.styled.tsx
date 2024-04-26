import styled, { css } from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import { FilledIconButton } from '@peiko/components/buttons/FilledIconButton'
import { FiltersIcon } from '@peiko/components/icons/FiltersIcon'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`

export const Panel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const CustomFilterBtn = styled((props) => {
  const { t } = useTranslation('common')

  return (
    <FilledIconButton size="m" iconColor="main3" {...props}>
      {t('status')}
      <FiltersIcon />
    </FilledIconButton>
  )
})(
  ({ theme }) => css`
    border-radius: 4px !important;
    background-color: ${theme.palette.base};

    &:hover {
      background-color: ${theme.palette.main20};
    }

    svg {
      width: 24px !important;
      height: 24px !important;
    }
  `,
)

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 8px;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`
