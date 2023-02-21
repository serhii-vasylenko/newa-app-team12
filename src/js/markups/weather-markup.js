// const LINK_TO_WEEK = 'https://sinoptik.ua/';
import { months, days, weekDay, dateToWeek } from '../utils/weather-dates';
import { onClick } from '../weather';
import { getPopularNewsAPI } from '../api/news-api';
import { getGeolocation } from '../weather';

const galleryContainer = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const weatherWidget = document.getElementById('weather');



function getMarkupWeather({ data }) {
  console.log(data);
  const today = new Date();
  let day = today.getDay();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  let temp = Math.round(data.main.temp);

  let template = `<div class="weather__header">
    <p class="weather__temp">${temp}&#176;</p>
    <div class="weather__wrapper">
      <p class="weather__status">${data.weather[0].main}</p>
      <p class="weather__location">${data.name}</p>
    </div>
  </div>
  <div>
    <img class="wheather__icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
  </div>
  <div class="weather__data">
    <p class="weather__date">${days[day]}</p>
    <p class="weather__date">${date} ${months[month]} ${year}</p>
  </div>
  <button class="weather__btn" type="button">weather for week</button>
`;
  weatherWidget.innerHTML = template;
  const weekBtn = document.querySelector('.weather__btn');
  weekBtn.addEventListener('click', onClick);
}



function getMarkupWeatherToWeek({ data }) {
  const templateLocationToWeek = `
      <button class="weather__btn weather__btn-close" type="button">close</button>
    <h2 class="weather__location weather__location-week">region: ${data.timezone}</h2>`;

  const parts = [];
  for (let i = 0; i < data.daily.length - 1; i += 1) {
    let tempDay = Math.round(data.daily[i].temp.day);
    let tempNight = Math.round(data.daily[i].temp.night);
    const templateListToWeek = `<table class="weather__table">
      <tr>
        <td class="weather__week">${weekDay[i]},<br>${dateToWeek[i]}
        </td>
        <td class="weather__week">
          <img
            class="wheather__icon-week"
            src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"
            alt="${data.daily[i].weather[0].main}"
          />
          <td class="weather__week">
            ${tempDay} / ${tempNight}&#8451;
          </td>
          <td class="weather__week weather__week-last">${data.daily[i].weather[0].main}</td>
        </td>
      </tr>
    </table>`;
    parts.push(templateListToWeek);
  }
  weatherWidget.innerHTML = templateLocationToWeek + parts;
  const clouseWeekWidget = document.querySelector('.weather__btn-close');
  clouseWeekWidget.addEventListener('click', getGeolocation);
}


function addClassToCard() {
  weatherWidget.classList.add('is-active');
}

function removeClassToCard() {
  weatherWidget.classList.remove('is-active');
}

export { getMarkupWeather, getMarkupWeatherToWeek };
export { addClassToCard, removeClassToCard };

  
  
// для проекта

async function getPopularAndWeather() {

  let popularNews = await getPopularNewsAPI()
    .then(getMarkupPopNewsAndWeather)
    .catch(error => notFoundPage.classList.toggle('visually-hidden'));

  return popularNews;
}
getPopularAndWeather();



// Variant 1
function getMarkupPopNewsAndWeather({ results }) {
  console.log('это популярные новости', results);
  let cardList = '';

  for (let i = 0; i < results.length; i += 1) {
    cardList += `
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
    galleryContainer.insertAdjacentHTML('afterbegin', cardList);
    galleryContainer.prepend(weatherWidget);
  }
  return cardList;
}
// ВАРИАНТ 2
// function getMarkupPopNewsAndWeather({ results }) {
//   console.log('это популярные новости', results);
//   let cardList = '';
//   let numCardsPerRow, widgetIndex;

//   if (window.innerWidth >= 1280) {
//     numCardsPerRow = 3;
//     widgetIndex = 2;
//   } else if (window.innerWidth >= 768) {
//     numCardsPerRow = 2;
//     widgetIndex = 1;
//   } else {
//     numCardsPerRow = 1;
//     widgetIndex = 0;
//   }

//   for (let i = 0; i < results.length; i += 1) {
// ШАБЛОН КАРТОЧКИ
//     if ((i + 1) % numCardsPerRow === 0 && i !== results.length - 1) {
//       cardList += weatherWidget;
//     }
//   }

//   galleryContainer.insertAdjacentHTML('afterbegin', cardList);
//   galleryContainer.children[widgetIndex].insertAdjacentElement(
//     'afterend',
//     weatherWidget
//   );

//   return cardList;
// }



// МЕДИАПРАВИЛО
window.onresize = function (event) {
  const listItems = document.querySelectorAll('.card-news__item');
  const weatherWidget = document.getElementById('weather');

  if (window.matchMedia('(min-width: 1280px)').matches) {
    listItems[1].parentNode.insertBefore(
      weatherWidget,
      listItems[1].nextSibling
    );
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    listItems[0].parentNode.insertBefore(
      weatherWidget,
      listItems[0].nextSibling
    );
  } else {
    galleryContainer.prepend(weatherWidget);
  }
};

