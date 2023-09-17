import { refs } from './refs';

const { galleryContainer } = refs;

export function markupGallery(searchResults) {
  const markup = searchResults
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"> 
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" width ="300" height="300" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item"><b>Likes</b><br />
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b><br />
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b><br />
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b><br />
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  }