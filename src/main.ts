import renderForm from './components/form'
import renderTable, { renderTableRow } from './components/table'
import renderFilter from './components/filter'

import type { Movie } from './models/movie'
import { handleDeleteMovie } from './utils/tableControlers'
import { submitForm } from './utils/formController'

import './style.css'
import { addMovie, getMovies } from './api/client'

let movies: Movie[] = await getMovies()
let currentMovie: Movie | null = null

const app = document.getElementById('app')
const form = renderForm()
const filter = renderFilter()
const table = renderTable()
const tableBody = table.querySelector('tbody')

const render = () => {
  if (!tableBody) return

  renderTableRow(
    tableBody,
    movies,
    (id: string) => handleDeleteMovie(movies, id, render)
  )
}

submitForm(form, currentMovie, movies, render)

app?.append(form, filter, table)

render()

const testMovie: Movie = {
  id: '1365',
  title: 'Фильм 3',
  genre: 'Комедия',
  isWatched: false,
  releaseYear: '2024'
}

addMovie(testMovie)
