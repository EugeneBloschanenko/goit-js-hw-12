
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.search.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: 'Введіть у полі пошуку яке зображення Вас цікавить.',
      position: 'topCenter'
    });
    return;
  }

  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  currentQuery = searchQuery;
  currentPage = 1;

  fetchImages(currentQuery, currentPage)
    .then(({ hits, totalHits: fetchedTotalHits }) => {
      if (hits.length === 0) {
        iziToast.error({
          title: 'Пошук не дав результатів. Будь ласка, спробуйте ще!',
          position: 'topCenter'
        });
        return;
      }

      totalHits = fetchedTotalHits;
      renderGallery(hits);
      checkLoadMoreButton();
    })
    .catch(error => {
      console.error('Під час запиту сталася помилка:', error);
      iziToast.error({
        title: 'Сталася помилка! Повторіть спробу пізніше.',
        message: `${error}`,
        position: 'topCenter'
      });
    });

  form.reset();
}

function onLoadMore() {
  currentPage += 1;

  fetchImages(currentQuery, currentPage)
    .then(({ hits }) => {
      renderGallery(hits, true); 
      checkLoadMoreButton();
      smoothScroll();
    })
    .catch(error => {
      console.error('Помилка при завантаженні додаткових зображень:', error);
      iziToast.error({
        title: 'Не вдалося завантажити додаткові зображення!',
        position: 'topCenter'
      });
    });
}

function checkLoadMoreButton() {
  if (currentPage * 40 >= totalHits) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Ви переглянули всі зображення за Вашим запитом!',
      position: 'topCenter'
    });
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function smoothScroll() {
  const firstItem = gallery.firstElementChild;
  if (!firstItem) return; 

  const { height } = firstItem.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: "smooth"
  });
}
