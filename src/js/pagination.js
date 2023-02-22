import {
  getPopularNewsAPI,
  getSearchNewsAPI,
  getCategoryNewsAPI,
} from './api/news-api.js';
import cardNews from './../templates/card-news.hbs';
import getRefs from './get-refs';

const refs = getRefs();

const paginationEl = document.getElementById('pagination');
const paginationContainerEl = document.querySelector('.pagination__container');
const btnNextPg = document.querySelector('.next-btn');
const btnPrevPg = document.querySelector('.prev-btn');
const searchFormEl = document.querySelector('.search-form');
// console.log(paginationEl, btnNextPg, btnPrevPg);

const results = [];

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 10,
};

searchFormEl.addEventListener('submit', e => {
  getSearchNewsAPI()
    .then(data => {
      console.log(data.arrayNews);
    })
    .then(arrayNews => renderNewsMarkup(arrayNews))
    .catch(error => console.log(error));
});

// paginationEl.addEventListener('click', e => {
//   const ele = e.target;
//   // console.log(ele);

//   if (ele.dataset.page) {
//     const pageNumber = parseInt(e.target.dataset.page, 10);
//     valuePage.curPage = pageNumber;
//   }

//   getAmountCards();

//   renderNewsMarkup(); //getPopularNewsAPI()
//   goToTop();
// });

// paginationContainerEl.addEventListener('click', e => {
//   handleButton(e.target);

//   renderNewsMarkup(); //getPopularNewsAPI()
//   goToTop();
// });

// function renderNewsMarkup(data) {
//   const getNews = data;
//   // console.log('getNews', getNews);

//   valuePage.totalPages = Math.ceil(
//     getNews.results.length / valuePage.amountCards
//   );
//   console.log('valuePage.amountCards', valuePage.amountCards);

//   chunkArray(getNews.results, valuePage.amountCards);
//   console.log('chunkArray', chunkArray(getNews.results, valuePage.amountCards));

//   for (let i = 0; i <= results.length; i += 1) {
//     console.log(results[i]);
//     if (valuePage.curPage === i + 1) {
//       console.log('page', results[i]);
//       refs.newsGalery.innerHTML = cardNews(results[i]);
//       break;
//     }
//   }

//   pagination(valuePage);

//   handleButtonLeft();
//   handleButtonRight();
// }

// розбиваємо масив отриманих даних на масив з масивами об"єктів

function chunkArray(arrayData, chunkSize) {
  while (arrayData.length) {
    results.push(arrayData.splice(0, chunkSize));
  }

  return results;
}

// визначаємо к-сть карток на сторінці в залежності від іnnerWidth
function getAmountCards() {
  if (window.innerWidth < 768) {
    valuePage.amountCards = 4;
  }

  if (window.innerWidth > 768 && window.innerWidth < 1280) {
    valuePage.amountCards = 7;
  }

  if (window.innerWidth >= 1280) {
    valuePage.amountCards = 8;
  }
}

function handleButton(element) {
  if (element.classList.contains('prev-btn')) {
    valuePage.curPage -= 1;
    // console.log(valuePage.curPage);
    handleButtonLeft();
    btnNextPg.disabled = false;
  } else if (element.classList.contains('next-btn')) {
    valuePage.curPage += 1;
    // console.log(valuePage.curPage);
    handleButtonRight();
    btnPrevPg.disabled = false;
  }
  pagination();
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnPrevPg.disabled = true;
    btnNextPg.disabled = false;
  } else {
    btnPrevPg.disabled = false;
  }
}

function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    //  console.log(valuePage.curPage);
    btnNextPg.disabled = true;
    btnPrevPg.disabled = false;
  } else {
    btnNextPg.disabled = false;
  }
}

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// DYNAMIC PAGINATION
function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4; // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dot = `<button class="pagination__btn-points">...</button>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    paginationEl.innerHTML = renderTwoSide;
  } else {
    paginationEl.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <button class="pagination__btn pagination__btn-num ${active}"  data-page="${index}">${index}</button>`;
}

function getAmountCardsDynamic() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    valuePage.amountCards = 4;
  }
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
    valuePage.amountCards = 7;
  }
  if (window.matchMedia('(min-width: 1280px)').matches) {
    valuePage.amountCards = 8;
  }
}

export { pagination };

// import { getPopularNewsAPI } from './api/news-api.js';
// // import { getMarkupWeather } from './markups/weather-markup';

// const popularNewsGallery = document.querySelector('.news-gallery');
// const notFoundPage = document.querySelector('.not-found');

// async function getPopularProduct() {
//   try {
//     const getNews = await getPopularNewsAPI();
//     console.log('Arr objects with mostpopular News', getNews.results);
//     const newsArr = getNews.results;

//     let markupNews = '';
//     if (window.innerWidth < 768) {
//       // let cutArr = newsArr.slice(0, 4);
//       // popularNewsGallery.innerHTML = markup(cutArr);
//       // console.log(cutArr);
//     }
//     if (window.innerWidth >= 768 && window.innerWidth < 1280) {
//       // let cutArr = newsArr.slice(0, 7);
//       // popularNewsGallery.innerHTML = markup(cutArr);
//     }
//     if (window.innerWidth >= 1280) {
//       for (let i = 0; i < 8; i += 1) {
//         markupNews += markup(newsArr[i]);

//         console.log(markupNews);
//         popularNewsGallery.innerHTML = markupNews;
//       }
//     }
//   } catch (error) {
//     notFoundPage.classList.toggle('visually-hidden');
//   }
// }

// getPopularProduct();

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
// // }

// function getMarkupWeather({ data }) {
//   const today = new Date();
//   let day = today.getDay();
//   let date = today.getDate();
//   let month = today.getMonth();
//   let year = today.getFullYear();

//   let temp = Math.round(data.main.temp);

//   let template = `<div class="weather__header">
//     <p class="weather__temp">${temp}&#176;</p>
//     <div class="weather__wrapper">
//       <p class="weather__status">${data.weather[0].main}</p>
//       <p class="weather__location">${data.name}</p>
//     </div>
//   </div>
//   <div>
//     <img class="wheather__icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
//   </div>
//   <div class="weather__data">
//     <p class="weather__date">${days[day]}</p>
//     <p class="weather__date">${date} ${months[month]} ${year}</p>
//   </div>
//   <button class="weather__btn" type="button">weather for week</button>
// `;
//   return template;
// }

