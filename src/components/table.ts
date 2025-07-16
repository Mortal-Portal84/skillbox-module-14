import { Movie } from '../api'
import { deleteMovie } from '../api'
import createButton from './ui/button'

export const renderTable = (
  onUpdate: () => void
): { table: HTMLTableElement; updateRows: (movies: Movie[]) => void } => {
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

  const updateRows = (movies: Movie[]) => {
    tbody.replaceChildren()

    movies.forEach((movie: Movie) => {
      const row = document.createElement('tr')
      const { title, genre, releaseYear, isWatched } = movie
      const rowData = [title, genre, releaseYear, isWatched]

      rowData.forEach((cellData) => {
        const td = document.createElement('td')
        td.textContent = typeof cellData === 'boolean' ? (cellData ? 'Да' : 'Нет') : String(cellData)
        row.appendChild(td)
      })

      const actionTd = document.createElement('td')
      actionTd.className = 'table_actionTd'

      const deleteBtn = createButton('button', 'delete', 'Удалить')
      deleteBtn.addEventListener('click', async () => {
        await deleteMovie(movie.id)
        onUpdate() // Сообщаем main.ts, что нужно обновиться
      })
      actionTd.append(deleteBtn)

      row.appendChild(actionTd)
      tbody.appendChild(row)
    })
  }

  return { table, updateRows }
}

export default renderTable
