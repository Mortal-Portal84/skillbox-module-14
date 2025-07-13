const createButton = (
  type: 'button' | 'submit' | 'reset' = 'button',
  id: string,
  text: string
): HTMLButtonElement => {
  const button = document.createElement('button')
  button.type = type
  button.id = id
  button.textContent = text

  return button
}

export default createButton
