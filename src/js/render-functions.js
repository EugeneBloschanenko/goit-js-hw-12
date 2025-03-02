
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
gallery.classList.add('gallery-style');

export function renderGallery(images, append = false) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="photo-card">
        <a href="${largeImageURL}"> <!-- Використовуємо велике зображення тут -->
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b><br>${likes}
          </p>
          <p class="info-item">
            <b>Views</b><br>${views}
          </p>
          <p class="info-item">
            <b>Comments</b><br>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b><br>${downloads}
          </p>
        </div>
      </div>
    `;
  }).join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup); 
  } else {
    gallery.innerHTML = markup; 
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
  
  lightbox.refresh();
}