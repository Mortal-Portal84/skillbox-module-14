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

export const addMovie = async (movie: Omit<Movie, 'id'>) => {
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


export const filterMoviesByParameters = async (params: {
  title?: string;
  genre?: string;
  releaseYear?: string;
  isWatched?: boolean;
}) => {
  // Создаем URL-параметры из объекта params
  const queryParams = new URLSearchParams();

  // Добавляем только те параметры, которые переданы
  if (params.title) queryParams.append('title', params.title);
  if (params.genre) queryParams.append('genre', params.genre);
  if (params.releaseYear) queryParams.append('releaseYear', params.releaseYear);
  if (params.isWatched !== undefined) queryParams.append('isWatched', params.isWatched.toString());

  // Формируем URL с параметрами
  const url = `${baseURL}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      email
    },
  });

  return await response.json();
}
