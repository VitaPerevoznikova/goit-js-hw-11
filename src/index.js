// import Notiflix from "notiflix";
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchImages } from './js/fetchImg';

// const refs = {
//     form: document.querySelector('#search-form'),
//     galleryMarkupEl: document.querySelector('div.gallery'),
//     formInputEl: document.querySelector('input'),
//     submitFormBtnEl: document.querySelector('.form-btn'),
//     loadMoreBtnEl: document.querySelector('.load-more'),
// }


// let page = 2;
// let limit = 40;
// const totalPages = 500 / limit;


// Notiflix.Notify.init({
//   position: 'right-top',
//   width: '400px',
//   fontSize: '20px',
// });

// const lightbox = new SimpleLightbox('.gallery a', { captionsData: `alt`, captionDelay: 250 });

// refs.form.addEventListener('submit', pictureRequest);
// refs.loadMoreBtnEl.addEventListener('click', loadMoreImgs);
// let name = '';



// function pictureRequest(e) {
//     e.preventDefault();
//     const {
//         elements: { searchQuery }
//     } = e.currentTarget;
    
//     name = searchQuery.value.toLowerCase().trim();
//     // console.log(name);
//     Notiflix.Notify.warning('Please enter request.')
//     clearInput()
//     if (name === '') {
//         refs.loadMoreBtnEl.classList.add('is-hidden');
//         Notiflix.Notify.warning('Please enter request.');
//         return
//     }
//  onImagesFetch(name);

//     function onImagesFetch(name) {
//         fetchImages(name)
//             .then(pictures => {
//                 console.log(pictures);
//                 if (pictures.total === 0) {
//                     refs.loadMoreBtnEl.classList.add('is-hidden');
//                     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//                     return;
//                 }
//                 refs.loadMoreBtnEl.classList.remove('is-hidden');
//                 addMarkupItems(pictures.hits);
//             })
//              .catch(error => console.log(error));
//     }
//     e.currentTarget.reset();
// };

// function loadMoreImgs() {  
//     const params = new URLSearchParams({
//      page: page,
//      per_page: limit,
//     });

//     const url = `https://pixabay.com/api/?key=25798215-b5224b890c985f6c53280bcb2&q=${name}&${params}&image_type=photo&orientation=horizontal&safesearch=true`;

//      if (page > totalPages) {
//         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//         return;
//     }
//     return fetch(url)
//         .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//         })
//         .then(pictures => {
//             addMarkupItems(pictures.hits);
//              page += 1;
//         });
// }

// function addMarkupItems(images) {
//     images.map(img => {
//             const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
//             return refs.galleryMarkupEl.insertAdjacentHTML('beforeend',
//                 `<div class="photo-card">
//                         <a class="img-link" href="${largeImageURL}">
//                             <img class = "gallery-image" src="${webformatURL}" data-source=${largeImageURL} alt="${tags}" loading="lazy" />
//                         </a>
//                         <div class="info">
//                             <p class="info-item">
//                                 <b>Likes</b> ${likes}
//                             </p>
//                             <p class="info-item">
//                                 <b>Views</b> ${views}
//                             </p>
//                             <p class="info-item">
//                                 <b>Comments</b> ${comments}
//                             </p>
//                             <p class="info-item">
//                                 <b>Downloads</b> ${downloads}
//                             </p>
//                         </div>
//                     </div>
//                 </div>   
//                 `)
//         })
//         .join('');
//     lightbox.refresh();
// };


// function clearInput() {
//   refs.galleryMarkupEl.innerHTML = '';
// }

import { fetchGallery } from './js/fetchImg';
import { lightbox } from './js/lightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import { markupGallery } from './js/marckup';

const { searchForm, galleryContainer, btnLoadMore } = refs;

const perPage = 40;
let page = 1;
let keyOfSearch = '';



btnLoadMore.classList.add('is-hidden');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  galleryContainer.innerHTML = '';
  page = 1;
  
  const { searchQuery } = event.currentTarget.elements;
  keyOfSearch = searchQuery.value
    .trim()
    .toLowerCase();


  if (keyOfSearch === '') {
    Notify.info('Enter your request, please!');
    return;
  }

  fetchGallery(keyOfSearch, page, perPage)
    .then(data => {
    const searchResults = data.hits;
        if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.');
    } else {
      Notify.info(`Hooray! We found ${data.totalHits} images.`);
      markupGallery(searchResults);
      lightbox.refresh();
    };
  
    if (data.totalHits > perPage) {
      btnLoadMore.classList.remove('is-hidden');
    };

  })
    .catch(fetchError);
  btnLoadMore.addEventListener('click', onClickLoadMore);

    event.currentTarget.reset();
};




function onClickLoadMore() {
  page += 1;
    fetchGallery(keyOfSearch, page, perPage)
    .then(data => {
      const searchResults = data.hits;
      const numberOfPage = Math.ceil(data.totalHits / perPage);

      markupGallery(searchResults);
      if (page === numberOfPage) {
        btnLoadMore.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        
        btnLoadMore.removeEventListener('click', onClickLoadMore);

      }
      lightbox.refresh();
    })
    .catch(fetchError);
};


function fetchError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!'
  );
}