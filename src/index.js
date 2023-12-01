import axios from 'axios';
import Notiflix from 'notiflix';

const submitBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector('.search-form');
const imageGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

let page = 1;
loadMoreBtn.style.visibility = 'hidden'

form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
    loadMoreBtn.style.visibility = 'hidden'
  event.preventDefault();
  page = 1;
  imageGallery.innerHTML = ""
  
  const valueForm = form.elements[0].value.trim();

  serviceImages(valueForm, page = 1)
    .then(resp => {
      const images = resp.data.hits;
     
      if (images.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
       
      }

      imageGallery.insertAdjacentHTML ("beforeend", markup(images));
      page += 1; 
      loadMoreBtn.style.visibility = 'visible';
      

      
      

    })
    .catch(err => console.log(err));
}

async function serviceImages(valueForm, page) {
  const URL = 'https://pixabay.com/api';
  const API_KEY = '41007047-5d1ed36a71ea406077c9bdda5';
  const imgType = 'photo';
  const imgOrientation = 'horizontal';
  

  const response = await axios.get(
    `${URL}/?key=${API_KEY}&q=${valueForm}&image_type=${imgType}&orientation=${imgOrientation}&safesearch=true&per_page=40&page=${page}`

  );

  return response;
}

function markup(images) {
 return images.map(
    ({ tags, likes, views, comments, downloads, webformatURL }) =>
      `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="card-image"/>
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



  

