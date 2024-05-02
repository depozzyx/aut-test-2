// Description: This file is used to compare two objects deeply.
import equal from 'react-fast-compare'

export function deepEqual(a: unknown, b: unknown): boolean {
  return equal(a, b)
}
