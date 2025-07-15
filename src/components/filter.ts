import createInputWithLabel from './ui/inputWithLabel'
import createButton from './ui/button'
import { validateTypedGenre, validateTypedName, validateTypedYear } from '../utils/helpers'

const renderFilter = () => {
  const filterContainer = document.createElement('div')
  const filterWrapper = document.createElement('div')
  const nameInput = createInputWithLabel(
    'text', 'name-filter', 'name-filter', null, 'Название фильма')
  const genreInput = createInputWithLabel(
    'text', 'genre-filter', 'genre-filter', null, 'Жанр')
  const yearInput = createInputWithLabel(
    'text', 'year-filter', 'year-filter', null, 'Год релиза')
  const select = document.createElement('select')
  const clearButton = createButton('button', 'clear', 'Удалить всё')

  filterContainer.className = 'filter'
  filterWrapper.className = 'filter__wrapper'

  const selectOptions = {
    all: 'Все',
    watched: 'Просмотренные',
    unwatched: 'Непросмотренные',
  }

  nameInput.addEventListener('input', e => validateTypedName(e))
  genreInput.addEventListener('input', e => validateTypedGenre(e))
  yearInput.addEventListener('input', e => validateTypedYear(e))

  Object.entries(selectOptions).map(([key, value]) => {
    const option = document.createElement('option')
    option.value = key
    option.textContent = value

    select.appendChild(option)
  })

  filterWrapper.append(nameInput, genreInput, yearInput, select)
  filterContainer.append(filterWrapper, clearButton)

  return filterContainer
}

export default renderFilter
