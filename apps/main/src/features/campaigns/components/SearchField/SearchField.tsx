import useTranslation from 'next-translate/useTranslation'

interface ISearchFieldProps {
  searchValue: string
}

export const SearchField = ({ searchValue }: ISearchFieldProps): JSX.Element => {
  const { t } = useTranslation('inputs')

  return (
    <div>
      <input type="text" value={searchValue} placeholder={t('search')} readOnly />
    </div>
  )
}
