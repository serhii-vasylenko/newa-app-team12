const LINK_TO_WEEK = 'https://sinoptik.ua/';

const weatherCardEl = document.getElementById('weather');

let currentDate;
let currentDay;

function getCurrentDate() {
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  currentDate = `${date} ${months[month]} ${year}`;
  return currentDate;
}
getCurrentDate();

function getCurrentDay() {
  let today = new Date();
  let day = today.getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDay = `${days[day]}`;
  return currentDay;
}
getCurrentDay();

function getMarkupWeather({ data }) {
  let location = data.name;
  let temp = Math.round(data.main.temp);
  let weatherStatus = data.weather[0].main;
  let weatherIcon = data.weather[0].icon;

  let template = `<div class="weather__header">
    <div class="weather__temp">${temp}&#176;</div>
    <div class="weather__wrapper">
      <div class="weather__status">${weatherStatus}</div>
      <div class="weather__location">${location}</div>
    </div>
  </div>
  <div>
    <img class="wheather__icon" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
  </div>
  <div class="weather__data">
    <div class="weather__date">${currentDay}</div>
    <div class="weather__date">${currentDate}</div>
  </div>
  <a class="weather__link"
    href="${LINK_TO_WEEK}"
    target="_blank"
    rel="noopener noreferrer nofollow"
  >weather for week</a>
`;
  weatherCardEl.innerHTML = template;
}

export { getMarkupWeather };
