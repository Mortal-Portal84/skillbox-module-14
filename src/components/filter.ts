import createInputWithLabel from './ui/inputWithLabel'
import createButton from './ui/button'

import { clearAllMovies, Movie } from '../api'
import { validateTypedGenre, validateTypedName, validateTypedYear } from '../utils'

const renderFilter = (
  updateRows: (movies: Movie[]) => void,
  getMovies: (params?: Partial<Movie>) => Promise<Movie[]>
) => {
  const filterContainer = document.createElement('div')
  const filterWrapper = document.createElement('div')
  const nameInput = createInputWithLabel('text', 'name-filter', 'name-filter', null, 'Название фильма')
  const genreInput = createInputWithLabel('text', 'genre-filter', 'genre-filter', null, 'Жанр')
  const yearInput = createInputWithLabel('text', 'year-filter', 'year-filter', null, 'Год релиза')
  const select = document.createElement('select')
  const clearButton = createButton('button', 'clear', 'Удалить всё')

  const filteredMovies: Partial<Movie> = {
    title: '',
    genre: '',
    releaseYear: '',
  }

  filterContainer.className = 'filter'
  filterWrapper.className = 'filter__wrapper'

  const selectOptions = {
    all: 'Все',
    watched: 'Просмотренные',
    unwatched: 'Непросмотренные',
  }

  Object.entries(selectOptions).map(([key, value]) => {
    const option = document.createElement('option')
    option.value = key
    option.textContent = value

    select.appendChild(option)
  })

  filterWrapper.append(nameInput, genreInput, yearInput, select)
  filterContainer.append(filterWrapper, clearButton)

  let debounceTimeout: number | null = null
  const triggerFilter = async () => {
    const cleanedFilter: Partial<Movie> = {}

    Object.entries(filteredMovies).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        (cleanedFilter as any)[key] = value
      }
    })

    const movies = Object.keys(cleanedFilter).length
      ? await getMovies(cleanedFilter)
      : await getMovies()

    updateRows(movies)
  }

  const debounceFilter = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    debounceTimeout = setTimeout(triggerFilter, 300) as unknown as number
  }

  nameInput.addEventListener('input', e => {
    validateTypedName(e)
    filteredMovies.title = (e.target as HTMLInputElement).value
    debounceFilter()
  })

  genreInput.addEventListener('input', e => {
    validateTypedGenre(e)
    filteredMovies.genre = (e.target as HTMLInputElement).value
    debounceFilter()
  })

  yearInput.addEventListener('input', e => {
    validateTypedYear(e)
    filteredMovies.releaseYear = (e.target as HTMLInputElement).value
    debounceFilter()
  })

  select.addEventListener('change', e => {
    switch ((e.target as HTMLInputElement).value) {
      case 'watched':
        filteredMovies.isWatched = true
        break
      case 'unwatched':
        filteredMovies.isWatched = false
        break
      default:
        delete filteredMovies.isWatched
    }

    debounceFilter()
  })

  clearButton.addEventListener('click', async () => {
    (nameInput.querySelector('input') as HTMLInputElement).value = '';
    (genreInput.querySelector('input') as HTMLInputElement).value = '';
    (yearInput.querySelector('input') as HTMLInputElement).value = '';
    select.value = 'all'

    Object.keys(filteredMovies).forEach(key => {
      key === 'isWatched' ? delete filteredMovies[key as keyof Movie] : (filteredMovies as any)[key] = ''
    })

    await clearAllMovies()

    triggerFilter()
  })

  return filterContainer
}

export default renderFilter
