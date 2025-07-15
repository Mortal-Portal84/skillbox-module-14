import { Movie } from '../models/movie'

const baseURL: string = 'https://sb-film.skillbox.cc/films'
const email = 'stalker10eg@mail.ru'

export const getMovies = async () => {
  const response = await fetch(baseURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      email
    }
  })
  return await response.json()
}

export const addMovie = async (movie: Movie) => {
  await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      email
    },
    body: JSON.stringify(movie)
  })
}

export const deleteMovie = async (id: string) => {
  await fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    headers: {
      email
    }
  })
}

export const clearAllMovies = async () => {
  await fetch(baseURL, {
    method: 'DELETE',
    headers: {
      email
    }
  })
}
