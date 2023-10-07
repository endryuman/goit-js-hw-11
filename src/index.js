// API key: 39874664-ed75082f01d8e06abe2f74d77
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
import { searchServise } from './api';

const refs = {
  form: document.querySelector('.search-form'),
  div: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const input = refs.form.elements.searchQuery;
const button = refs.form.elements[1];
refs.form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  button.disabled = true;

  searchServise(input.value)
    .then(
      resp => (
        (refs.div.innerHTML = createMarkup(resp.hits)),
        refs.loadMoreBtn.classList.remove('hidden'),
        Notify.success(`Hooray! We found ${resp.totalHits} images.`)
      )
    )
    .catch(err => console.log(err))
    .finally(refs.form.reset(), (button.disabled = false));
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}
let page = 1;

refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore(evt) {
  page += 1;
  evt.target.disabled = true;

  searchServise(input.value, page)
    .then(resp => {
      refs.div.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
      if (page > 12) {
        refs.loadMoreBtn.classList.add('hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.log(err))
    .finally((evt.target.disabled = false));
}
