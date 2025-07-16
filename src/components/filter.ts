
import { Movie } from '../models/movie'
import createInputWithLabel from './ui/inputWithLabel'
import createButton from './ui/button'
import { validateTypedName, validateTypedGenre, validateTypedYear } from '../utils/helpers'

const renderFilter = (onFilter: (movies: Partial<Movie>) => void) => {
  const filterContainer = document.createElement('div')
  const filterWrapper = document.createElement('div')
  const nameInput = createInputWithLabel(
    'text', 'name-filter', 'name-filter', null, 'Название фильма')
  const genreInput = createInputWithLabel(
    'text', 'genre-filter', 'genre-filter', null, 'Жанр')
  const yearInput = createInputWithLabel(
    'text', 'year-filter', 'year-filter', null, 'Год релиза')
  const select = document.createElement('select')
  const clearButton = createButton('button', 'clear', 'Удалить всё')

  const filteredMovies: Partial<Movie> = {
    title: '',
    genre: '',
    releaseYear: '',
  }

  filterContainer.className = 'filter'
  filterWrapper.className = 'filter__wrapper'

  const selectOptions = {
    all: 'Все',
    watched: 'Просмотренные',
    unwatched: 'Непросмотренные',
  }

  Object.entries(selectOptions).map(([key, value]) => {
    const option = document.createElement('option')
    option.value = key
    option.textContent = value

    select.appendChild(option)
  })

  filterWrapper.append(nameInput, genreInput, yearInput, select)
  filterContainer.append(filterWrapper, clearButton)

// Функция для запуска фильтрации после небольшой задержки
  let debounceTimeout: number | null = null;
  const triggerFilter = () => {
    // Очищаем пустые свойства
    const cleanedFilter: Partial<Movie> = {};

    Object.entries(filteredMovies).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        // Используем явное приведение типов, чтобы TypeScript понимал,
        // что мы делаем
        (cleanedFilter as any)[key] = value;
      }
    });

    // Вызываем колбэк с актуальными параметрами фильтра
    onFilter(cleanedFilter);
  };


  // Дебаунс функция для предотвращения слишком частых запросов
  const debounceFilter = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(triggerFilter, 300) as unknown as number;
  };

  nameInput.addEventListener('input', e => {
    validateTypedName(e);
    filteredMovies.title = (e.target as HTMLInputElement).value;
    debounceFilter();
  });

  genreInput.addEventListener('input', e => {
    validateTypedGenre(e);
    filteredMovies.genre = (e.target as HTMLInputElement).value;
    debounceFilter();
  });

  yearInput.addEventListener('input', e => {
    validateTypedYear(e);
    filteredMovies.releaseYear = (e.target as HTMLInputElement).value;
    debounceFilter();
  });

  select.addEventListener('change', e => {
    switch ((e.target as HTMLInputElement).value) {
      case 'watched':
        filteredMovies.isWatched = true;
        break;
      case 'unwatched':
        filteredMovies.isWatched = false;
        break;
      default:
        delete filteredMovies.isWatched;
    }
    debounceFilter();
  });

  // Добавляем обработчик для кнопки очистки
  clearButton.addEventListener('click', () => {
    // Сбрасываем значения полей
    (nameInput.querySelector('input') as HTMLInputElement).value = '';
    (genreInput.querySelector('input') as HTMLInputElement).value = '';
    (yearInput.querySelector('input') as HTMLInputElement).value = '';
    select.value = 'all';

    // Сбрасываем объект фильтра
    Object.keys(filteredMovies).forEach(key => {
      if (key === 'isWatched') {
        delete filteredMovies[key as keyof Movie];
      } else {
        // Используем явное приведение типов для обоих объектов
        (filteredMovies as any)[key] = '';
      }
    });


    // Запускаем фильтрацию с пустыми параметрами
    triggerFilter();
  });

  return filterContainer;
}

export default renderFilter;
