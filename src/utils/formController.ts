import { saveMoviesToStorage } from './localStorageUtils'
import type { Movie } from '../models/movie'
import renderForm from '../components/form'

export const submitForm = (
  formElement: HTMLFormElement,
  currentMovie: Movie | null,
  movies: Movie[],
  render: () => void
) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const name = form.querySelector('#name') as HTMLInputElement
    const genre = form.querySelector('#genre') as HTMLInputElement
    const year = form.querySelector('#year') as HTMLInputElement
    const isWatched = form.querySelector('#isWatched') as HTMLInputElement

    if (currentMovie) {
      const updatedMovie = {
        ...currentMovie,
        name: name.value,
        genre: genre.value,
        year: year.value,
        isWatched: isWatched.checked
      }

      const index = movies.findIndex(movie => movie.id === currentMovie.id)
      if (index !== -1) {
        movies[index] = updatedMovie
      }
    } else {
      const newMovie: Movie = {
        id: crypto.randomUUID(),
        name: name.value,
        genre: genre.value,
        year: year.value,
        isWatched: isWatched.checked
      }

      movies.unshift(newMovie)

      name.value = ''
      genre.value = ''
      year.value = ''
      isWatched.checked = false
    }

    saveMoviesToStorage(movies)

    render()
  }

  formElement.addEventListener('submit', handleSubmit)

  return formElement
}

export const switchToEditForm = (
  movie: Movie,
  form: HTMLFormElement,
  movies: Movie[],
  app: HTMLElement | null,
  table: HTMLElement,
  render: () => void,
  setCurrentMovie: (movie: Movie | null) => void
) => {
  if (!app) return

  setCurrentMovie(movie)

  const editForm = renderForm(movie)
  const resetBtn = editForm.querySelector('#reset') as HTMLButtonElement

  submitForm(editForm, movie, movies, render)

  app.replaceChildren(editForm, table)

  resetBtn?.addEventListener('click', () => {
    setCurrentMovie(null)
    app.replaceChildren(form, table)
  })
}

