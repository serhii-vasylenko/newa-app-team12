// const LINK_TO_WEEK = 'https://sinoptik.ua/';
import { months, days, weekDay, dateToWeek } from '../utils/weather-dates';
import { onClick } from '../weather';
// import { onSubmit } from '../weather';
// эти две ф-ции импортированы для проекта:
import { getGeolocation } from '../weather';
import { onError } from '../api/weather-api';

// const weatherCardEl = document.getElementById('weather');
const weatherWidget = document.getElementById('weather');

function getMarkupWeather({ data }) {
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

  
  
  
// для проекта
import { getPopularNewsAPI } from '../api/news-api';
let galleryContainer = document.querySelector('.news-gallery');

async function getPopularAndWeather() {
  onError();
  getGeolocation();

  let popularNews = await getPopularNewsAPI().then(getMarkupPopNewsAndWeather);

  return popularNews;
}
getPopularAndWeather();

function getMarkupPopNewsAndWeather({ results }) {
  console.log('это популярные новости', results);
  let cardList = '';

  for (let i = 0; i < results.length; i += 1) {
    // { section, title, url, published_date} (для примера взят элемент section)
    cardList += `<li class="exemple-card">${results[i].section}</li>`;

    galleryContainer.insertAdjacentHTML('afterbegin', cardList);
    galleryContainer.prepend(weatherWidget);
  }
  return cardList;
}

window.onresize = function (event) {
  let listItems = document.querySelectorAll('.exemple-card');

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

export { addClassToCard, removeClassToCard };
