import countryCodeLookup from 'country-code-lookup'

export const getCountryName = (code: string): string | undefined => {
  const countryObj = countryCodeLookup.countries.find((c) => c.iso2 === code)
  return countryObj?.country
}
