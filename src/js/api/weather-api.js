import axios from 'axios';
import {
  getMarkupWeather,
  getMarkupWeatherToWeek,
} from '../markups/weather-markup';

const URL = 'https://api.openweathermap.org/data/';
const API_KEY = 'ea60bf329e302f40922f2ed0631e5003';//my key

let api;

async function getWeather() {
  try {
    const response = await axios.get(`${api}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `${URL}2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  getWeather().then(getMarkupWeather);
}

function onError(error) {
  api = `${URL}2.5/weather?q=London&units=metric&appid=${API_KEY}`;
  getWeather().then(getMarkupWeather);
}

function onSuccessToWeek(position) {
  const { latitude, longitude } = position.coords;
  api = `${URL}3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly&appid=${API_KEY}`;
  getWeather().then(getMarkupWeatherToWeek);
}


export { onSuccess, onError };
export { onSuccessToWeek };
