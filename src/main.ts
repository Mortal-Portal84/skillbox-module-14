import renderForm from './components/form'
import renderTable, { renderTableRow } from './components/table'

import type { Movie } from './models/movie'
import { getMoviesFromStorage } from './utils/localStorageUtils'
import { handleDeleteMovie } from './utils/tableControlers'
import { submitForm, switchToEditForm } from './utils/formController'

import './style.css'
import renderFilter from './components/filter'

let movies: Movie[] = getMoviesFromStorage()
let currentMovie: Movie | null = null

const app = document.getElementById('app')
const form = renderForm()
const filter = renderFilter()
const table = renderTable()
const tableBody = table.querySelector('tbody')

const setCurrentMovie = (movie: Movie | null) => {
  currentMovie = movie
}

const render = () => {
  if (!tableBody) return

  renderTableRow(
    tableBody,
    movies,
    (id: string) => handleDeleteMovie(movies, id, render),
  )
}

submitForm(form, currentMovie, movies, render)

app?.append(form, filter, table)

render()
