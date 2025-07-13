import type { Movie } from '../models/movie'

const STORAGE_KEY = 'movies'

export const getMoviesFromStorage = (): Movie[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Ошибка чтения localStorage:', e)
    return []
  }
}

export const saveMoviesToStorage = (movies: Movie[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  } catch (e) {
    console.error('Ошибка записи в localStorage:', e)
  }
}
