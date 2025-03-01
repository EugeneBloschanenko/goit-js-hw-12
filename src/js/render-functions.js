
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
gallery.classList.add('gallery-style');

export function renderGallery(images) {
  const markup = images.map(({ 
    webformatURL, 
    largeImageURL, 
    tags, 
    likes, 
    views, 
    comments, 
    downloads 
  }) => 
  `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    </a>
    <div class="info">
      <p class="info-item"><b>Likes</b> <span>${likes}</span></p>
      <p class="info-item"><b>Views</b> <span>${views}</span></p>
      <p class="info-item"><b>Comments</b> <span>${comments}</span></p>
      <p class="info-item"><b>Downloads</b> <span>${downloads}</span></p>
    </div>
  </li>` 
  ).join('');

  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
    
    lightbox.refresh();
}