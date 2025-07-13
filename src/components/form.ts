import createInputWithLabel from './ui/inputWithLabel'
import createButton from './ui/button'
import type { Movie } from '../models/movie.ts'
import { validateTypedGenre, validateTypedName, validateTypedYear } from '../utils/helpers'

const renderForm = (movie: Movie | null = null) => {
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

  if (movie) {
    const nameInput = form.querySelector('#name') as HTMLInputElement
    const genreInput = form.querySelector('#genre') as HTMLInputElement
    const yearInput = form.querySelector('#year') as HTMLInputElement
    const isWatchedInput = form.querySelector('#isWatched') as HTMLInputElement
    const cancelButton = createButton('button', 'reset', 'Отменить редактирование')

    nameInput.value = movie.name.trim()
    genreInput.value = movie.genre.trim()
    yearInput.value = movie.year
    isWatchedInput.checked = movie.isWatched

    submitButton.textContent = 'Обновить'

    form.appendChild(cancelButton)
  }

  return form
}

export default renderForm
