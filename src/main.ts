import renderForm from './components/form'
import renderTable from './components/table'
import renderFilter from './components/filter'

import { getMovies, Movie } from './api'
import handleDeleteMovie from './utils/tableControlers'
import submitForm from './utils/formController'

import './style.css'

let movies: Movie[] = []
let updateRows: (movies: Movie[]) => void


const app = document.getElementById('app')
const form = renderForm()
const { table, updateRows: updateTableRows } = renderTable(
  movies,
  async (id: string) => handleDeleteMovie(id, render, (newMovies) => (movies = newMovies))
)
updateRows = updateTableRows
const filter = renderFilter(updateRows, getMovies)

const render = async () => {
  updateRows(movies)
}

const initializeApp = async () => {
  movies = await getMovies()
  submitForm(form, initializeApp)
  app?.replaceChildren(form, filter, table)
  await render()
}

initializeApp()
