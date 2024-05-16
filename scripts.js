import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

import {
    data,
    bookListFragment,
    genreFragment,
    authorFragment,
    searchResultFragment
  } from "./element.js";

let page = 1;
let matches = books


function createBookPreview({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
}

function renderBookList(books, fragment) {
    for (const book of books.slice(0, BOOKS_PER_PAGE)) {
        fragment.appendChild(createBookPreview(book));
    }
    data.list.items.appendChild(fragment);
}

function genresOptions() {
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreFragment.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        genreFragment.appendChild(element);
    }

    data.search.genres.appendChild(genreFragment);
}

function authorsOptions() {
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorFragment.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        authorFragment.appendChild(element);
    }

    data.search.authors.appendChild(authorFragment);
}

function setupTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('[data-settings-theme]').value = 'night';
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.querySelector('[data-settings-theme]').value = 'day';
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

function showMoreButton() {
    const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    data.list.button.innerText = `Show more (${remainingBooks > 0 ? remainingBooks : 0})`;
    data.list.button.disabled = remainingBooks <= 0;

    data.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
}

function setupEventListeners() {
    data.search.cancel.addEventListener('click', () => {
        data.search.overlay.open = false;
    });

    data.settings.cancel.addEventListener('click', () => {
        data.settings.overlay.open = false;
    });

    data.header.search.addEventListener('click', () => {
        data.search.overlay.open = true;
        data.search.title.focus();
    });

    data.header.settings.addEventListener('click', () => {
        data.settings.overlay.open = true;
    });

    data.list.close.addEventListener('click', () => {
        data.list.active.open = false;
    });

    data.settings.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);

        if (theme === 'night') {
            document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
            document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        } else {
            document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
            document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        }

        data.settings.overlay.open = false;
    });

    data.search.form.addEventListener('submit', handlingSearchSubmit);
    data.list.button.addEventListener('click', handleShowMore);
    data.list.items.addEventListener('click', bookClick);
}

function handlingSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book);
        }
    }

    page = 1;
    matches = result;

    if (result.length < 1) {
        data.list.message.classList.add('list__message_show');
    } else {
        data.list.message.classList.remove('list__message_show');
    }

    data.list.items.innerHTML = '';
    renderBookList(result, searchResultFragment);

    showMoreButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    data.search.overlay.open = false;
}

function handleShowMore() {
    const fragment = document.createDocumentFragment();

    for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        fragment.appendChild(createBookPreview(book));
    }

    data.list.items.appendChild(fragment);
    page += 1;
    showMoreButton();
}


function bookClick(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;

            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            }

            active = result;
        }
    }

    if (active) {
        data.list.active.open = true;
        data.list.blur.src = active.image;
        data.list.image.src = active.image;
        data.list.title.innerText = active.title;
        data.list.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        data.list.description.innerText = active.description;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init(); // init is called after the DOM is fully loaded
  });
  
  function init() {
    renderBookList(matches, bookListFragment);
    genresOptions();
    authorsOptions();
    setupTheme();
    showMoreButton();
    setupEventListeners();
  }
  