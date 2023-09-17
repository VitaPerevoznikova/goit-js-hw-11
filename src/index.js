
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