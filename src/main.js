
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from './js/pixabay-api'
import {renderGallery} from './js/render-functions'

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  
  const searchQuery = e.currentTarget.elements.search.value.trim();
  if (!searchQuery) {
      iziToast.error({
          title: 'Введіть у полі пошуку яке зображення Вас цікавить.',
          message: '',
          position: 'topCenter'
      });
    return;
  }

  gallery.innerHTML = '';

  fetchImages(searchQuery)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
            title: 'Пошук не дав результатів. Будь ласка, спроуйте ще!',
            message: '',
            position: 'topCenter'
        })
        return;
      }
      renderGallery(images);
    })
    .catch(error => {
      console.error('Під час запиту сталася наступна помилка:', error);
      iziToast.error({
            title: 'Сталася помилка! Повторіть спробу пізніше.',
            message: `${error}`,
            position: 'topCenter'
        })
    });

  form.reset();
}