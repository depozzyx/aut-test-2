import PhoneInputComponent from 'react-phone-input-2'
import ct from 'countries-and-timezones'
import 'react-phone-input-2/lib/style.css'
import { Label } from '../Label'
import {
  BUTTON_CLASS,
  CONTAINER_CLASS,
  DROPDOWN_CLASS,
  INPUT_CLASS,
  SEARCH_CLASS,
} from './constants'
import { Container } from './PhoneInput.styled'
import { TInputPhoneProps } from './types'

/**
 * Phone input component
 *
 * This component is based on `react-phone-input-2` library and used it props.
 *
 * Please see [Docs](https://github.com/bl00mber/react-phone-input-2) for more details.
 */
export const PhoneInput: React.FC<TInputPhoneProps> = ({
  disabled,
  onChange,
  error,
  placeholder,
  label,
  readOnly,
  value,
  name,
  enableSearch = true,
  disableSearchIcon = true,
  width,
  ...otherProps
}) => {
  const timezone = ct.getTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const country = timezone && timezone.countries[0]

  const htmlFor = name

  return (
    <Container disabled={disabled || readOnly} error={Boolean(error)} width={width}>
      <Label {...label} error={error} htmlFor={htmlFor}>
        <PhoneInputComponent
          value={value}
          inputClass={INPUT_CLASS}
          searchClass={SEARCH_CLASS}
          containerClass={CONTAINER_CLASS}
          buttonClass={BUTTON_CLASS}
          dropdownClass={DROPDOWN_CLASS}
          country={country ? country.toLowerCase() : 'us'}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          disableSearchIcon={disableSearchIcon}
          enableSearch={enableSearch}
          inputProps={{ id: htmlFor, name, readOnly }}
          {...otherProps}
        />
      </Label>
    </Container>
  )
}
