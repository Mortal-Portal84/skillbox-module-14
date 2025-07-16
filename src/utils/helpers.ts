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
