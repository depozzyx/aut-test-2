export const hasArrayChanged = <T extends number | string>(
  oldArr: T[],
  newArr: T[],
): boolean =>
  oldArr.length !== newArr.length ||
  (!!newArr.length && !newArr.every((el) => oldArr.includes(el)))
