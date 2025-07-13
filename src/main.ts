import renderForm from './components/form'
import renderSorter from './components/sorter'
import renderTable, { renderTableRow } from './components/table'

import type { Movie } from './models/movie'
import { getMoviesFromStorage } from './utils/localStorageUtils'
import { handleDeleteMovie } from './utils/tableControlers'
import { sortCompare } from './utils/helpers'
import { submitForm, switchToEditForm } from './utils/formController'

import './style.css'

let movies: Movie[] = getMoviesFromStorage()
let currentMovie: Movie | null = null
let sortState: { key: keyof Movie | null; order: 'ascending' | 'descending' } = {
  key: null,
  order: 'ascending'
}

const app = document.getElementById('app')
const form = renderForm()
const sorter = renderSorter()
const sortBtn = sorter.querySelector('#sort') as HTMLButtonElement
const sortSelect = sorter.querySelector('select') as HTMLSelectElement
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
    (movie) => switchToEditForm(movie, form, movies, app, sorter, table, render, setCurrentMovie)
  )
}

submitForm(form, currentMovie, movies, render)

sortSelect.addEventListener('change', () => {
  sortState.key = sortSelect.value as keyof Movie
})

sortBtn?.addEventListener('click', () => {
  movies.sort((a, b) => sortCompare(a, b, (sortSelect.value as keyof Movie), sortState.order))
  sortState.order = sortState.order === 'ascending' ? 'descending' : 'ascending'
  render()
})

app?.append(form, sorter, table)

render()
