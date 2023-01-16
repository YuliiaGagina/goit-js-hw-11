import axios from 'axios';
console.log(axios);
import { PixabaiAPI } from './fetchimages';
const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),

}

const pixabaiAPI = new PixabaiAPI;

refs.searchFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    const query = e.target.elements.searchQuery.value;

    pixabaiAPI.getPhotos().then( data =>{
        console.log(data.hits[0]);
        // const {webformatURL, largeImageURL, tags,likes,views, comments, downloads} = hits;
        refs.galleryEl.insertAdjacentHTML('beforeend', makeMarkup(data.hits));
       
        

    }).catch(error =>{
        console.log(error);
    })
    


    e.target.reset();
});

function makeMarkup (photos){
    const markup = photos.map(photo =>{
        return `<div class="photo-card">
        <img width=300 height=200 src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
        <div class="info">
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
      </div>`
    }).join('');
    return markup;
   
};


