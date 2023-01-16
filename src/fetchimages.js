"use Strict";
import axios from 'axios';
console.log(axios);

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32895691-46e81bd7531541cc66e325b33';

 export class PixabaiAPI {
   
   getPhotos(query){
    this.page = 1;

    if(query){
        this.query = query;
    }
    
    const searchParams = {
        params: {
          key: KEY,
          q: this.query,
          page: this.page,
          per_page: 40,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
        },
      };
      return axios.get(`${BASE_URL}`, searchParams).then(response=> response.data);
   }
}

