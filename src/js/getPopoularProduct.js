import { getPopularNewsAPI } from './api/news-api.js';
// import {newsTemplate} from '../templates/card-news.hbs';
import { checkFavCards } from './addAndRemoveFromFavorite.js';

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');

async function getPopularProduct() {
  try {
    const getNews = await getPopularNewsAPI();
    console.log('Arr objects with mostpopular News', getNews.results);
    const newsArr = getNews.results;
    popularNewsGallery.innerHTML = markup(newsArr);
    checkFavCards();
  } catch (error) {
    notFoundPage.classList.toggle('visually-hidden');
  }
}

getPopularProduct();
function markup(data) {
  return data
    .map(({ abstract, media, published_date, section, title, url }) => {
      let mediaURL = `https://webassets.eurac.edu/31538/1647583511-adobestock_490465800.jpeg?auto=format&fm=jpg&h=588&w=980`;

      if (
        media &&
        media[0] &&
        media[0]['media-metadata'] &&
        media[0]['media-metadata'][2]
      ) {
        mediaURL = media[0]['media-metadata'][2].url;
      }
      return `
    <li class="card-news__item">
    <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
      <p class="news-category"> ${section}</p>
      <button class="news-favorite addToFavoriteBtn" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16"
      height="16"
      viewBox="0 0 37 32"
      >
<path style="stroke: var(--color1, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
</svg>
      </button>
    </div>
    <div class="card-news__info">
      <h3 class="card-news__title"> ${title}</h3>
      <p class="card-news__info-chort"> ${abstract}...</p>
      <div class="card-information">
        <div class="card-infrmation__data"> ${published_date}</div>
        <a class="card__infotion__more" rel="nofollow noindex noreferrer" target="_blank" href="${url}">Read more</a>
      </div>
    </div>
    <div class="owerlay-readed">
      <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
    </div>
  </li>`;
    })
    .join('');
}
