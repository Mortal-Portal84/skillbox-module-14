import { deleteMovie, getMovies, Movie } from '../api'

const handleDeleteMovie = async (
  id: string,
  render: () => void,
  updateMovies: (newMovies: Movie[]) => void
)  => {
  await deleteMovie(id)

  const updatedMovies = await getMovies()

  updateMovies(updatedMovies)

  render()
}

export default handleDeleteMovie
