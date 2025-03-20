export const coefficients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const modes = ['fixed', 'adaptive']
export const workHours = [
  '00:00 - 23:59',
  '08:00 - 16:00',
  '09:00 - 17:00',
  '10:00 - 18:00',
  '11:00 - 19:00',
  '12:00 - 20:00',
]

export const hideWholePhoneOption = 'hideWhole'
export const hideFirstPhoneOption = 'hideFirst'
export const hideLastPhoneOption = 'hideLast'
export const hideLeadPhoneOptions = [
  hideFirstPhoneOption,
  hideLastPhoneOption,
  hideWholePhoneOption,
]

export const emptyOption = {
  label: '-',
  value: '',
}

export const hidePhoneAmountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => ({
  label: option.toString(),
  value: option.toString(),
}))

export const campaignSettingKeys = {
  mode: 'campaignMode',
  coefficient: 'campaignCoefficient',
  workHours: 'campaignWorkHours',
  hidePhoneManager: 'campaignHidePhoneManager',
  hidePhoneAmountManager: 'campaignHidePhoneAmountManager',
  hidePhoneAgent: 'campaignHidePhoneAgent',
  hidePhoneAmountAgent: 'campaignHidePhoneAmountAgent',
}
