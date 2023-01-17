"use Strict";
import axios from 'axios';
console.log(axios);

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32895691-46e81bd7531541cc66e325b33';

 export class PixabaiAPI {
    page = 1;
    query = '';
  async getPhotos(query){
    

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
          lang: 'ru',
          
        },
      };
      const {data} = await axios.get(`${BASE_URL}`, searchParams);
      return data;
   }
}

