import renderForm from './components/form'
import renderTable, { renderTableRow } from './components/table'
import renderFilter from './components/filter'

import { getMovies, Movie } from './api'
import handleDeleteMovie from './utils/tableControlers'
import submitForm from './utils/formController'

import './style.css'

let movies: Movie[] = []

const app = document.getElementById('app')
const form = renderForm()
const table = renderTable()
const tableBody = table.querySelector('tbody')

const handleFilter = async (params: Partial<Movie>) => {
  Object.keys(params).length === 0
    ? movies = await getMovies()
    : movies = await getMovies(params)

  await render()
}

const filter = renderFilter(handleFilter)

const render = async () => {
  if (!tableBody) return

  renderTableRow(
    tableBody,
    movies,
    async (id: string) => handleDeleteMovie(
      id,
      render,
      (newMovies) => movies = newMovies)
  )
}

const initializeApp = async () => {
  movies = await getMovies()

  submitForm(form, initializeApp)

  app?.replaceChildren(form, filter, table)

  await render()
}

initializeApp()
