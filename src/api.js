import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  div: document.querySelector('.gallery'),
};

export async function searchServise(data, page = 1) {
  const baseUrl = 'https://pixabay.com/api/';
  const key = '39874664-ed75082f01d8e06abe2f74d77';
  const url = `${baseUrl}?key=${key}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    if (response.data.hits.length === 0) {
      refs.div.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}