import { getCategoryNewsAPI } from './api/news-api.js';
import {markup } from './getPopoularProduct.js';
import { checkFavCards } from './addAndRemoveFromFavorite.js';



const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const currentDateContainer = document.querySelector('.calendar-btn-span');
const calendarBtn = document.querySelector('.calendar-btn');

calendarBtn.addEventListener('input', getCategoryNews);

export async function getCategoryNews(category, offset) {
  let apdatData = [];
    const getCategotyNews = await getCategoryNewsAPI(category, offset);
    const dataNews = getCategotyNews.results;
    console.log("🚀 ~ file: getCategoryNews.js:15 ~ getCategoryNews ~ dataNews:", dataNews)
    const currentDate = currentDateContainer.innerText;
    
    if (currentDate === 'Select a date...') {
      apdatData = toAdaptData (dataNews);
      
      
    }
    else {
      const filteredNews = filterDateNews(dataNews, currentDate); // get Date from Calendar
      console.log("🚀 ~ file: getCategoryNews.js:25 ~ getCategoryNews ~ filteredNews:", filteredNews)

        if (filteredNews.length === 0) {
      notFoundPage.classList.add('visually-hidden');
      return;
    }
      apdatData = toAdaptData (filteredNews);
      console.log(apdatData);
     
    }
    
    function toAdaptData (data) {
      console.log("🚀 ~ file: getCategoryNews.js:35 ~ toAdaptData ~ data:", data)
      
      return data.map(obj => {
        if (obj.multimedia === null && obj.abstract  !== undefined) {
          return;
        }
      const container = {};
      (container.abstract = obj.abstract),
        (container.media = [
          {
            caption: obj.title,
            'media-metadata': [
              { url: obj.multimedia[0].url },
              { url: obj.multimedia[1].url },
              { url: obj.multimedia[2].url },
            ],
          },
        ]);

      container.published_date = obj.published_date;
      container.subsection = obj.section;
      container.title = obj.title;
      container.url = obj.url;

      return container;
    
    });
  }
    popularNewsGallery.innerHTML = markup(apdatData);
    checkFavCards();
}

function filterDateNews(arrNews, selectedDate) { 
  return arrNews.filter(news => {
    return dateConversion(news.published_date) === selectedDate;
  });
}

function dateConversion(getDate) {
  const date = new Date(getDate);
  const month = String(date.getMonth() + 1);
  return `${date.getDate()}/${month.padStart(2, "0")}/${date.getFullYear()}`; 
}

