import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(axios);
import { PixabaiAPI } from './fetchimages';
const refs = {
  searchFormEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  btnAddMoreEl: document.querySelector('.load-more'),
};

const pixabaiAPI = new PixabaiAPI();

refs.searchFormEl.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  refs.galleryEl.innerHTML = '';

  try {
    const data = await pixabaiAPI.getPhotos(query);
    console.log(data.hits.length);
    console.log(data.totalHits);

    refs.galleryEl.insertAdjacentHTML('beforeend', makeMarkup(data.hits));
    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {
        gallery.refresh();
    });

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    refs.btnAddMoreEl.classList.remove('hidden');

    if (data.hits.length === 0) {
      refs.btnAddMoreEl.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      refs.galleryEl.innerHTML = '';
    }
  } catch (err) {
    console.log(err);
  }

  e.target.reset();
});

refs.btnAddMoreEl.addEventListener('click', async e => {
  const data = await pixabaiAPI.getPhotos();
  pixabaiAPI.page += 1;
  refs.galleryEl.insertAdjacentHTML('beforeend', makeMarkup(data.hits));

  if (data.totalHits / pixabaiAPI.page < 40) {
    refs.btnAddMoreEl.classList.add('hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
});

function makeMarkup(photos) {
  const markup = photos
    .map(photo => {
      return `<div class="photo-card">
        <a class="gallery__item" href="${photo.largeImageURL}">
<img width=300 height=200 src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
</a><div class="info">
          <p class="info-item">
            <b>Likes:</b>
           </p>
          <p class="info-item">
            <b>Views:</b>
          </p>
          <p class="info-item">
            <b>Comments:</b>
          </p>
          <p class="info-item">
            <b>Downloads:</b>
          </p>
        </div>
        <div class="number-wrap">
        <p>${photo.likes}</p>
        <p> ${photo.views}</p>
        <p> ${photo.comments}</p>
        <p> ${photo.downloads}</p>
      </div>
      </div>`;
    })
    .join('');
  return markup;
}
