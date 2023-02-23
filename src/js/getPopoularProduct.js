import { getPopularNewsAPI } from './api/news-api.js';
import { getMarkupWeather } from './markups/weather-markup.js';
import { weatherData } from './markups/weather-markup.js';
import { pagination } from './pagination.js';
import { markup } from './markups/newsCard.js';
import { checkFavCards } from "./addAndRemoveFromFavorite.js";

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const paginationEl = document.getElementById('pagination');

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 0,
};

async function getPopularProduct() {
  try {
    const getNews = await getPopularNewsAPI();
    // console.log('Arr objects with mostpopular News', getNews.results);
    const newsArr = getNews.results;

    let markupNews = '';
    const markupWeather = getMarkupWeather({ data: weatherData });
    // console.log(markupWeather);
    // console.log({ data: weatherData });
    const itemWeather = `<li class="weather__card">${markupWeather.markup}</li>`;
    // console.log(itemWeather);

    if (window.innerWidth < 768) {
      for (let i = 0; i < 5; i += 1) {
        if (i === 0) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
        valuePage.amountCards = 5;
        valuePage.totalPages = Math.ceil(newsArr.length / valuePage.amountCards);
      }
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      for (let i = 0; i < 8; i += 1) {
        if (i === 1) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
        valuePage.amountCards = 8;
        valuePage.totalPages = Math.ceil(newsArr.length / valuePage.amountCards);
      }
    }
    if (window.innerWidth >= 1280) {
      for (let i = 0; i < 9; i += 1) {
        if (i === 2) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
        valuePage.amountCards = 9;
        valuePage.totalPages = Math.ceil(newsArr.length / valuePage.amountCards);
      }
    }
    popularNewsGallery.innerHTML = markupNews;
    checkFavCards();
    // console.log(markupNews);
    pagination(valuePage);
  } catch (error) {
    notFoundPage.classList.toggle('visually-hidden');
  }
}

getPopularProduct();


// function markup({ abstract, media, published_date, subsection, title, url }) {
//   let mediaURL =
//     'https://amsrus.ru/wp-content/uploads/2016/02/Mercedes-Benz-C63-AMG-Black-Series-1.jpg';
//   if (
//     media &&
//     media[0] &&
//     media[0]['media-metadata'] &&
//     media[0]['media-metadata'][2]
//   ) {
//     mediaURL = media[0]['media-metadata'][2].url;
//   }
//   return `
//     <li class="card-news__item card__readed">
//     <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
//       <p class="news-category"> ${subsection}</p>
//       <button class="news-favorite" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16" height="16"><use href="../images/icons-defs.svg#icon-heart-transparent"></use></svg>
//       </button>
//     </div>
//     <div class="card-news__info">
//       <h3 class="card-news__title"> ${title}</h3>
//       <p class="card-news__info"> ${abstract}...</p>
//       <div class="card-information">
//         <div class="card-infrmation__data"> ${published_date}</div>
//         <a class="card__infotion__more" href="${url}">Read more</a>
//       </div>
//     </div>
//     <div class="owerlay-readed is-hidden">
//       <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
//     </div>
//   </li>`;
// }
// import { getPopularNewsAPI } from './api/news-api.js';
// // import {newsTemplate} from '../templates/card-news.hbs';
// import { checkFavCards } from './addAndRemoveFromFavorite.js';​
// const popularNewsGallery = document.querySelector('.news-gallery');
// const notFoundPage = document.querySelector('.not-found');​
// async function getPopularProduct() {
//   try {
//     const getNews = await getPopularNewsAPI();
//     console.log('Arr objects with mostpopular News', getNews.results);
//     const newsArr = getNews.results;
//     popularNewsGallery.innerHTML = markup(newsArr);
//     checkFavCards();
//   } catch (error) {
//     notFoundPage.classList.toggle('visually-hidden');
//   }
// }​
// getPopularProduct();
// function markup(data) {
//   return data
//     .map(({ abstract, media, published_date, subsection, title, url }) => {
//       let mediaURL = `https://webassets.eurac.edu/31538/1647583511-adobestock_490465800.jpeg?auto=format&fm=jpg&h=588&w=980`;
//       if (
//         media &&
//         media[0] &&
//         media[0]['media-metadata'] &&
//         media[0]['media-metadata'][2]
//       ) {
//         mediaURL = media[0]['media-metadata'][2].url;
//       }
//       return `
//     <li class="card-news__item">
//     <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
//       <p class="news-category"> ${subsection}</p>
//       <button class="news-favorite addToFavoriteBtn" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16" height="16"><use href="../images/icons-defs.svg#icon-heart-transparent"></use></svg>
//       </button>
//     </div>
//     <div class="card-news__info">
//       <h3 class="card-news__title"> ${title}</h3>
//       <p class="card-news__info-chort"> ${abstract}...</p>
//       <div class="card-information">
//         <div class="card-infrmation__data"> ${published_date}</div>
//         <a class="card__infotion__more" rel="nofollow noindex noreferrer" target="_blank" href="${url}">Read more</a>
//       </div>
//     </div>
//     <div class="owerlay-readed">
//       <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
//     </div>
//   </li>`;
//     })
//     .join('');
// }