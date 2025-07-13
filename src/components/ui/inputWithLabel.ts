const createInputWithLabel = (
  type: 'text' | 'email' | 'password' | 'range' | 'radio' | 'checkbox' | 'number',
  inputID: string,
  inputName: string,
  labelText: string,
  placeholder: string | null = null,
  isRequired: boolean = false,
  isChecked: boolean = false
) => {
  const wrapper = type === 'radio' ? document.createDocumentFragment() : document.createElement('div')
  if (wrapper instanceof HTMLDivElement)
    wrapper.className = 'form__item'

  const input = document.createElement('input')
  input.type = type
  input.id = inputID
  input.name = inputName
  input.className = 'form__input'

  if (placeholder !== null) input.placeholder = placeholder
  if (isRequired) input.required = true
  if (isChecked) input.checked = true

  const label = document.createElement('label')
  label.className = 'form__label'
  label.htmlFor = inputID

  if (type === 'radio' || type === 'checkbox') {
    label.textContent = labelText
    wrapper.append(input, label)
    input.value = label.textContent.toLowerCase()
  } else {
    label.textContent = `${labelText}: `
    wrapper.append(label, input)
  }

  if (type === 'range') {
    input.min = '1'
    input.max = '10'
    input.step = '1'
    input.value = '5'
  }

  if (type === 'number') {
    input.min = '1900'
    input.step = '1'
  }

  return wrapper
}

export default createInputWithLabel
