import { getPopularNewsAPI } from './api/news-api.js';
// import { getMarkupWeather } from './markups/weather-markup';

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');

async function getPopularProduct() {
  try {
    const getNews = await getPopularNewsAPI();
    console.log('Arr objects with mostpopular News', getNews.results);
    const newsArr = getNews.results;

    let markupNews = '';
    if (window.innerWidth < 768) {
      // let cutArr = newsArr.slice(0, 4);
      // popularNewsGallery.innerHTML = markup(cutArr);
      // console.log(cutArr);
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      // let cutArr = newsArr.slice(0, 7);
      // popularNewsGallery.innerHTML = markup(cutArr);
    }
    if (window.innerWidth >= 1280) {
      for (let i = 0; i < 8; i += 1) {
        markupNews += markup(newsArr[i]);

        console.log(markupNews);
        popularNewsGallery.innerHTML = markupNews;
      }
    }
  } catch (error) {
    notFoundPage.classList.toggle('visually-hidden');
  }
}

getPopularProduct();

function markup({ abstract, media, published_date, subsection, title, url }) {
  let mediaURL =
    'https://amsrus.ru/wp-content/uploads/2016/02/Mercedes-Benz-C63-AMG-Black-Series-1.jpg';
  if (
    media &&
    media[0] &&
    media[0]['media-metadata'] &&
    media[0]['media-metadata'][2]
  ) {
    mediaURL = media[0]['media-metadata'][2].url;
  }
  return `
    <li class="card-news__item card__readed">
    <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
      <p class="news-category"> ${subsection}</p>
      <button class="news-favorite" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16" height="16"><use href="../images/icons-defs.svg#icon-heart-transparent"></use></svg>
      </button>
    </div>
    <div class="card-news__info">
      <h3 class="card-news__title"> ${title}</h3>
      <p class="card-news__info"> ${abstract}...</p>
      <div class="card-information">
        <div class="card-infrmation__data"> ${published_date}</div>
        <a class="card__infotion__more" href="${url}">Read more</a>
      </div>
    </div>
    <div class="owerlay-readed is-hidden">
      <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
    </div>
  </li>`;
}
