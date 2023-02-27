const LINK_TO_WEEK = 'https://openweathermap.org/';
import { months, days } from '../utils/weather-dates';

let weatherData = {
  coord: {},
  main: 0,
  name: '',
  timezone: 0,
  weather: [{main: '', icon: '',}],
};

function updateWeatherData(response) {
  // console.log('this updateWeatherData (2)');
  weatherData.main = response.data.main.temp;
  weatherData.name = response.data.name;
  weatherData.weather.main = response.data.weather[0].main;
  weatherData.weather.icon = response.data.weather[0].icon;

  return weatherData;
}

function getMarkupWeather({ data: weatherData }) {
// console.log('weatherData in getMarkupWeather', weatherData);
  const today = new Date();
  let day = today.getDay();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  const tempRound = isNaN(weatherData.main) ? 0 : Math.round(weatherData.main);

  const templateWeather = `<div class="weather__header">
    <p class="weather__temp">${tempRound}&#176;</p>
    <div class="weather__wrapper">
      <p class="weather__status">${weatherData.weather.main}</p>
      <p class="weather__location">${name}</p>
    </div>
  </div>
  <div>
    <img class="wheather__icon" src="http://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png" alt="${weatherData.weather.main}">
  </div>
  <div class="weather__data">
    <p class="weather__date">${days[day]}</p>
    <p class="weather__date">${date} ${months[month]} ${year}</p>
  </div>
  <a href="${LINK_TO_WEEK}" target="_blank" rel="noopener nofollow noreferer" class="weather__btn">weather for week</a>
`;

  return {
    markup: templateWeather,
    setClickHandler: (conteiner, onClick) => {
      const button = conteiner.querySelector('.weather__btn');
      button.addEventListener('click', onClick);
    },
  };
}


export { getMarkupWeather, weatherData, updateWeatherData };
