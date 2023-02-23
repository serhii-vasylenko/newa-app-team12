import { getPopularNewsAPI } from './api/news-api.js';
import { getMarkupWeather } from './markups/weather-markup.js';
import { weatherData } from './markups/weather-markup.js';
import { valuePage, pagination } from './pagination.js';
import { markup } from './markups/newsCard.js';
import { checkFavCards } from "./addAndRemoveFromFavorite.js";

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');

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
