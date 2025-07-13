import type { Movie } from '../models/movie'

export const sortCompare = (
  a: Movie,
  b: Movie,
  key: keyof Movie,
  order: 'ascending' | 'descending'
): number => {
  const direction = order === 'ascending' ? 1 : -1

  if (key === 'year') {
    return (new Date(a[key]).getTime() - new Date(b[key]).getTime()) * direction
  }

  const firstValue = a[key]
  const secondValue = b[key]

  return (firstValue as string).localeCompare(secondValue as string) * direction
}

export const validateTypedName = (e: Event) => {
  const input = e.target as HTMLInputElement
  input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s.,+'!?-]/g, '')
}

export const validateTypedGenre = (e: Event) => {
  const input = e.target as HTMLInputElement
  input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
}

export const validateTypedYear = (e: Event) => {
  const input = e.target as HTMLInputElement

  input.value = input.value.replace(/[^0-9]/g, '')

  if (input.value.length > 4) {
    input.value = input.value.slice(0, 4)
  }
}
