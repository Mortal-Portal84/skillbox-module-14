import renderForm from './components/form'
import renderTable from './components/table'
import renderFilter from './components/filter'
import { getMovies, Movie } from './api'
import submitForm from './utils/formController'
import './style.css'

let movies: Movie[] = []
let tableUpdater: (movies: Movie[]) => void

const app = document.getElementById('app')
const form = renderForm()

const handleDataUpdate = async () => {
  movies = await getMovies()
  tableUpdater(movies)
}

const { table, updateRows } = renderTable(handleDataUpdate)
tableUpdater = updateRows

const handleFilter = async (params: Partial<Movie>) => {
  movies = await getMovies(params)
  tableUpdater(movies)
}

const filter = renderFilter(handleFilter)

const initializeApp = async () => {
  submitForm(form, handleDataUpdate)
  app?.replaceChildren(form, filter, table)
  await handleDataUpdate()
}

initializeApp()
