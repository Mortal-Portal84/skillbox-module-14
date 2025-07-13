import type { Movie } from '../models/movie'
import { saveMoviesToStorage } from './localStorageUtils'

export const handleDeleteMovie = (movies: Movie[], id: string, render: () => void) => {
  const updatedMovies = movies.filter((movie) => movie.id !== id)

  movies.splice(movies.findIndex((movie) => movie.id === id), 1)
  saveMoviesToStorage(updatedMovies)
  render()
}

