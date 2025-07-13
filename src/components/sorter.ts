import createButton from './ui/button'

const renderSorter = () => {
  const wrapper = document.createElement('div')
  const select = document.createElement('select')
  const sortBtn = createButton('button', 'sort', 'Сортировать')

  const headers = {
    name: 'Название',
    genre: 'Жанр',
    year: 'Год'
  }

  Object.entries(headers).forEach(([key, label]) => {
    const option = document.createElement('option')
    option.id = key
    option.value = key
    option.textContent = label
    select.appendChild(option)
  })

  wrapper.className = 'sorter'
  wrapper.append(select, sortBtn)

  return wrapper
}

export default renderSorter
