import createInputWithLabel from './ui/inputWithLabel'
import createButton from './ui/button'
import { validateTypedGenre, validateTypedName, validateTypedYear } from '../utils/helpers'

const renderForm = () => {
  const form: HTMLFormElement = document.createElement('form')
  const name =
    createInputWithLabel('text', 'name', 'name', 'Название', null, true)
  const genre = createInputWithLabel('text', 'genre', 'genre', 'Жанр', null, true)
  const year =
    createInputWithLabel('text', 'year', 'year', 'Год', null, true)
  const isWatched = createInputWithLabel('checkbox', 'isWatched', 'isWatched', 'Успели посмотреть?', null)
  const submitButton = createButton('submit', 'submit', 'Добавить')

  name.addEventListener('input', (e) => validateTypedName(e))
  genre.addEventListener('input', (e) => validateTypedGenre(e))
  year.addEventListener('input', (e) => validateTypedYear(e))

  form.append(name, genre, year, isWatched, submitButton)

  return form
}

export default renderForm
