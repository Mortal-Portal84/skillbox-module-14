import type { Movie } from '../models/movie'

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
        title: name.value,
        genre: genre.value,
        releaseYear: year.value,
        isWatched: isWatched.checked
      }

      movies.unshift(newMovie)

      name.value = ''
      genre.value = ''
      year.value = ''
      isWatched.checked = false
    }

    render()
  }

  formElement.addEventListener('submit', handleSubmit)

  return formElement
}
