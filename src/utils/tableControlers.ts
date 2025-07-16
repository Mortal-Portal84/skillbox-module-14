import { deleteMovie, getMovies } from '../api/client'
import { Movie } from '../models/movie'

export const handleDeleteMovie = async (
  id: string,
  render: () => void,
  updateMovies: (newMovies: Movie[]) => void
)  => {
  await deleteMovie(id)

  const updatedMovies = await getMovies()

  updateMovies(updatedMovies)

  render()
}


