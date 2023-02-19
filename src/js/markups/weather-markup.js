// const LINK_TO_WEEK = 'https://sinoptik.ua/';
import { months, days, weekDay, dateToWeek } from '../utils.js/weather-dates';
import { onClick } from '../weather';

const weatherCardEl = document.getElementById('weather');


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
  weatherCardEl.innerHTML = template;
  const weekBtn = document.querySelector('.weather__btn');
  weekBtn.addEventListener('click', onClick);
}

function getMarkupWeatherToWeek({ data }) {
  const templateLocationToWeek = `
      <button class="weather__btn-week" type="button">close</button>
    <h2 class="weather__location-week">region: ${data.timezone}</h2>`;
  
  const parts = [];
  for (let i = 0; i < data.daily.length - 1; i += 1) {
    let tempDay = Math.round(data.daily[i].temp.day);
    let tempNight = Math.round(data.daily[i].temp.night);
    const templateListToWeek = `<div class="weather__element">
    <p class="weather__data-week">
    ${weekDay[i]}, ${dateToWeek[i]}
    </p>
      <img
        class="wheather__icon-week"
        src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"
        alt="${data.daily[i].weather[0].main}"
      />
      <p class="weather__temp-week">${tempDay}/${tempNight}&#8451;</p>
      <p class="weather__status-week">${data.daily[i].weather[0].main}</p>
    </div>
`;
    parts.push(templateListToWeek);
  }
  weatherCardEl.innerHTML = templateLocationToWeek + parts;
}

export { getMarkupWeather, getMarkupWeatherToWeek };
// href="${LINK_TO_WEEK}"
// target="_blank"
// rel="noopener noreferrer nofollow"
