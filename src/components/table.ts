import createButton from './ui/button'
import type { Movie } from '../models/movie'

export const renderTableRow = (
  tableBody: HTMLTableSectionElement,
  movies: Movie[],
  onDelete: (id: string) => void,
) => {
  tableBody.replaceChildren()

  movies.forEach((movie: Movie) => {
    const row = document.createElement('tr')
    const { name, genre, year, isWatched } = movie
    const rowData = [name, genre, year, isWatched]

    rowData.forEach((cellData) => {
      const td = document.createElement('td')

      if (typeof cellData === 'boolean') {
        td.textContent = cellData ? 'Да' : 'Нет'
      } else {
        td.textContent = String(cellData)
      }

      row.appendChild(td)
    })

    const actionTd = document.createElement('td')
    actionTd.className = 'table_actionTd'

    const deleteBtn = createButton('button', 'delete', 'Удалить')

    deleteBtn.addEventListener('click', () => onDelete(movie.id))

    actionTd.append(deleteBtn)
    row.appendChild(actionTd)

    tableBody.appendChild(row)
  })
}

const renderTable = (): HTMLTableElement => {
  const table = document.createElement('table')
  table.className = 'table'

  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  const headers = {
    name: 'Название',
    genre: 'Жанр',
    year: 'Год',
    isWatched: 'Успели посмотреть?',
    action: 'Действие'
  }

  Object.entries(headers).forEach(([key, label]) => {
    const th = document.createElement('th')
    th.id = key
    th.textContent = label
    th.className = 'table__head'
    headerRow.appendChild(th)
  })

  thead.appendChild(headerRow)
  const tbody = document.createElement('tbody')
  table.append(thead, tbody)

  return table
}

export default renderTable
