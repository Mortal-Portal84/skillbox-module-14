import { addMovie, Movie } from '../api'

const submitForm = (
  formElement: HTMLFormElement,
  initApp: () => void
) => {
  const handleSubmit = async (e: Event) => {
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

    const newMovie: Omit<Movie, 'id'> = {
        title: name.value,
        genre: genre.value,
        releaseYear: year.value,
        isWatched: isWatched.checked
      }

    try {
      await addMovie(newMovie)
      form.reset()
      initApp()
    } catch (err) {
      console.error('Ошибка при добавлении фильма:', err)
    }
  }

  formElement.addEventListener('submit', handleSubmit)

  return formElement
}

export default submitForm
