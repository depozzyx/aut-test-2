type Nullable<T> = T | null | undefined | ''

export function cleanObject<T extends Record<string, Nullable<T>>>(obj: T): Partial<T> {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, value]) => value),
  ) as Partial<T>
}
