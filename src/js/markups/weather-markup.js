// const LINK_TO_WEEK = 'https://sinoptik.ua/';
import { months, days, weekDay, dateToWeek } from '../utils/weather-dates';
import { onClick } from '../weather';
import { getGeolocation } from '../weather';



const weatherData = {
  coord: { lon: 30.2748, lat: 50.5461 },
  main: { temp: 0.42 },
  name: 'Hostomel',
  timezone: 7200,
  weather: [
    {
      main: 'Clouds',
      icon: '04n',
    },
  ],
};



// це функція розмітки картки погоди що з'являється разом 
// з популярними новинами. Функція приймає дані з апі погоди ({data})
function getMarkupWeather({ data }) {
  console.log('погода з апи', data);
  const today = new Date();
  let day = today.getDay();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  tempRound = Math.round(data.main.temp);

  templateWeather = `<div class="weather__header">
    <p class="weather__temp">${tempRound}&#176;</p>
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

  // const weekBtn = document.querySelectorAll('.weather__btn-close');
  // weekBtn.addEventListener('click', onClick);

  return templateWeather;
}



//   weatherWidget.innerHTML = markupLocationToWeek + parts;
//   const clouseWeekWidget = document.querySelector('.weather__btn-close');
//   clouseWeekWidget.addEventListener('click', getGeolocation);

function getMarkupWeatherToWeek({ data }) {
  const markupLocationToWeek = `
      <button class="weather__btn weather__btn-close" type="button">close</button>
    <h2 class="weather__location weather__location-week">region: ${data.timezone}</h2>`;

  const parts = [];
  for (let i = 0; i < data.daily.length - 1; i += 1) {
    const markupListToWeek = `<table class="weather__table">
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
    parts.push(markupListToWeek);
  }

  const markupToWeek = document.createElement('div');
  markupToWeek.innerHTML = markupLocationToWeek + parts.join('');

  const clouseWeekWidget = document.querySelector('.weather__btn-close');
  clouseWeekWidget.addEventListener('click', getGeolocation);

  return markupToWeek.outerHTML;
}


function renderToGallery() {
  const markup = getMarkupWeather({ data: weatherData });
  console.log(markup);
  const gallery = document.querySelector('.news-gallery');
  const item = document.createElement('li');
  item.classList.add('weather__card');
  item.innerHTML = markup;
  gallery.appendChild(item);
}
// renderToGallery();



function addClassToCard() {
  // weatherWidget.classList.add('is-active');
}

function removeClassToCard() {
  // weatherWidget.classList.remove('is-active');
}

export { getMarkupWeather, getMarkupWeatherToWeek };
export { addClassToCard, removeClassToCard };
export { weatherData };

  




// МЕДИАПРАВИЛО
// window.onresize = function (event) {
//   const listItems = document.querySelectorAll('.card-news__item');
//   const weatherWidget = document.getElementById('weather');

//   if (window.matchMedia('(min-width: 1280px)').matches) {
//     listItems[1].parentNode.insertBefore(
//       weatherWidget,
//       listItems[1].nextSibling
//     );
//   } else if (window.matchMedia('(min-width: 768px)').matches) {
//     listItems[0].parentNode.insertBefore(
//       weatherWidget,
//       listItems[0].nextSibling
//     );
//   } else {
//     galleryContainer.prepend(weatherWidget);
//   }
// };

