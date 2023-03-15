import { getCategoryNewsAPI } from './api/news-api.js';
import { markup } from './markups/newsCard.js';
import { getMarkupWeather } from './markups/weatherMarkup.js';
import { weatherData } from './markups/weatherMarkup.js';
import { ref, pagination, goToTop } from './pagination.js';
import { onPaginationEl, onPaginationContainerEl } from './getPopoularProduct';

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const currentDateContainer = document.querySelector('.calendar-btn-span');
const calendarBtn = document.querySelector('.calendar-btn');
const todayBtn = document.querySelector('.today-btn');
const paginator = document.querySelector('.pagination__container');
const btnNextPage = document.querySelector('.next-btn');
const btnPrevPage = document.querySelector('.prev-btn');
const spinner = document.querySelector('.loader');

const valuePages = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 0,
};

let newsArr = [];
let currentCategory = '';

calendarBtn.addEventListener('blur', onSearchDate);
todayBtn.addEventListener('click', onSearchDate);

export async function getCategoryNews(category) {
  paginator.style.display = 'flex';
  if (currentCategory !== category) {
    valuePages.curPage = 1;
  }

  ref.paginationEl.removeEventListener('click', onPaginationEl);
  ref.paginationContainerEl.removeEventListener(
    'click',
    onPaginationContainerEl
  );
  currentCategory = category;

  paginator.addEventListener('click', onClickPaginatorButton);
  let filteredNews = [];
  try {
    popularNewsGallery.innerHTML = '';
    spinner.classList.remove('visually-hidden');
    const getCategotyNews = await getCategoryNewsAPI(category);

    const dataNews = getCategotyNews.results;
    const markupWeather = getMarkupWeather({ data: weatherData });
    const itemWeather = `<li class="weather__card">${markupWeather.markup}</li>`;
    const currentDate = currentDateContainer.innerText;

    if (currentDate === 'Select a date...') {
      newsArr = toAdaptData(dataNews);
    } else {
      filteredNews = filterDateNews(dataNews, currentDate);

      if (filteredNews.length === 0) {
        popularNewsGallery.innerHTML = '';
        notFoundPage.classList.remove('visually-hidden');
        paginator.style.display = 'none';
        return;
      }
      if (filteredNews.length !== 0) {
        notFoundPage.classList.add('visually-hidden');
      }
      newsArr = toAdaptData(filteredNews);
    }

    popularNewsGallery.innerHTML = countNewsPage(newsArr, itemWeather);

    pagination(valuePages);
    if (valuePages.totalPages === 1) {
      disabledButtonTrue();
    }
  } catch {
    notFoundPage.classList.toggle('visually-hidden');
  }
  finally {
    spinner.classList.add('visually-hidden');
  }
}

function onClickPaginatorButton(event) {
  if (event.target.dataset.page) {
    console.log(event.target.dataset.page);
    valuePages.curPage = Number(event.target.dataset.page);
    if (valuePages.curPage === 1) {
      btnPrevPage.disabled = true;
      btnNextPage.disabled = false;
    } else if (valuePages.curPage === valuePages.totalPages) {
      btnNextPage.disabled = true;
      btnPrevPage.disabled = false;
    } else {
      disabledButtonFalse();
    }
  }
  if (event.target.classList.contains('next-btn')) {
    valuePages.curPage++;
    if (valuePages.curPage === valuePages.totalPages) {
      btnNextPage.disabled = true;
      btnPrevPage.disabled = false;
    } else {
      disabledButtonFalse();
    }
  }
  if (event.target.classList.contains('prev-btn')) {
    valuePages.curPage--;
    if (valuePages.curPage === 1) {
      btnPrevPage.disabled = true;
      btnNextPage.disabled = false;
    } else {
      disabledButtonFalse();
    }
  }
  getCategoryNews(currentCategory);
  goToTop();
}

function countNewsPage(newsArr, itemWeather) {
  let markupNews = '';
  if (window.innerWidth < 768) {
    if (newsArr.length < 5) {
      for (let i = 0; i < newsArr.length; i += 1) {
        if (i === 0) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
      }
    } else {
      let countEl = 5;
      let kitElements = (valuePages.curPage - 1) * 5;

      if (valuePages.curPage === valuePages.totalPages) {
        kitElements = (valuePages.curPage - 1) * 5;
        countEl = newsArr.length - kitElements;
      }
      for (let i = kitElements; i < kitElements + countEl; i += 1) {
        if (i === kitElements) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
      }
    }
    valuePages.amountCards = 5;
    valuePages.totalPages = Math.ceil(newsArr.length / valuePages.amountCards);
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    if (newsArr.length === 1) {
      markupNews += markup(newsArr[0]) + itemWeather;
    } else if (newsArr.length < 8) {
      for (let i = 0; i < newsArr.length; i += 1) {
        if (i === 1) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
      }
    } else {
      let countEl = 8;
      let kitElements = (valuePages.curPage - 1) * 8;

      if (valuePages.curPage === valuePages.totalPages) {
        kitElements = (valuePages.curPage - 1) * 8;
        countEl = newsArr.length - kitElements;
      }
      for (let i = kitElements; i < kitElements + countEl; i += 1) {
        if (i === 1 + kitElements) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
      }
    }
    valuePages.amountCards = 8;
    valuePages.totalPages = Math.ceil(newsArr.length / valuePages.amountCards);
  }
  if (window.innerWidth >= 1280) {
    if (newsArr.length <= 2) {
      for (let i = 0; i < newsArr.length; i += 1) {
        markupNews += markup(newsArr[i]);
      }
      markupNews += itemWeather;
    } else if (newsArr.length < 9 && newsArr.length > 2) {
      for (let i = 0; i < newsArr.length; i += 1) {
        if (i === 2) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
      }
    } else {
      let countEl = 9;
      let kitElements = (valuePages.curPage - 1) * 9;

      if (valuePages.curPage === valuePages.totalPages) {
        kitElements = (valuePages.curPage - 1) * 9;
        countEl = newsArr.length - kitElements;
      }
      for (let i = kitElements; i < kitElements + countEl; i += 1) {
        if (i === 2 + kitElements) {
          markupNews += itemWeather;
        } else {
          markupNews += markup(newsArr[i]);
        }
      }
    }
    valuePages.amountCards = 9;
    valuePages.totalPages = Math.ceil(newsArr.length / valuePages.amountCards);
  }
  return markupNews;
}

function toAdaptData(data) {
  return data.map(obj => {
    if (obj.multimedia === null || obj.section === 'Automobiles') {
      obj.multimedia = [
        {
          url: true,
        },
        {
          url: true,
        },
        {
          url: 'https://t3.ftcdn.net/jpg/01/09/01/16/360_F_109011607_xtOkqVoVTx54Dmf85pDmYTU0iwI82Kbq.jpg',
        },
      ];
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

    container.published_date = dateConversion(obj.published_date);
    container.section = obj.section;
    container.title = obj.title;
    container.url = obj.url;

    return container;
  });
}

function filterDateNews(arrNews, selectedDate) {
  return arrNews.filter(news => {
    return String(dateConversion(news.published_date)) === String(selectedDate);
  });
}

function dateConversion(getDate) {
  const date = new Date(getDate);
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${day.padStart(2, '0')}/${month.padStart(
    2,
    '0'
  )}/${date.getFullYear()}`;
}

function disabledButtonFalse() {
  btnPrevPage.disabled = false;
  btnNextPage.disabled = false;
}

function disabledButtonTrue() {
  btnPrevPage.disabled = true;
  btnNextPage.disabled = true;
}

function onSearchDate() {
  if (!currentCategory) {
    return;
  }
  getCategoryNews(currentCategory);
}
