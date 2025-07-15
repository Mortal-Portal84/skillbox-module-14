import type { Movie } from '../models/movie'

export const handleDeleteMovie = (movies: Movie[], id: string, render: () => void) => {
  movies.splice(movies.findIndex((movie) => movie.id === id), 1)
  render()
}

