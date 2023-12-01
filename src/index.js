import axios from 'axios';
import Notiflix from 'notiflix';

const submitBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector('.search-form');
const imageGallery = document.querySelector('.gallery');

form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  const valueForm = form.elements[0].value.trim();

  serviceImages(valueForm)
    .then(resp => {
      const images = resp.data.hits;
      console.log(images[0]);
      if (images.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      imageGallery.insertAdjacentHTML ("beforeend", markup(images));
    })
    .catch(err => console.log(err));
}

function serviceImages(valueForm) {
  const URL = 'https://pixabay.com/api';
  const API_KEY = '41007047-5d1ed36a71ea406077c9bdda5';
  const imgType = 'photo';
  const imgOrientation = 'horizontal';

  const response = axios.get(
    `${URL}/?key=${API_KEY}&q=${valueForm}&image_type=${imgType}&orientation=${imgOrientation}&safesearch=true`
  );

  return response;
}

function markup(images) {
 return images.map(
    ({ tags, likes, views, comments, downloads, webformatURL }) =>
      `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`
  ).join('')
}

