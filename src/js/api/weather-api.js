import axios from 'axios';
import { getMarkupWeather } from '../markups/weather-markup';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ea60bf329e302f40922f2ed0631e5003';

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
  api = `${URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  getWeather().then(getMarkupWeather);
}

function onError(error) {
  api = `${URL}?q=London&units=metric&appid=${API_KEY}`;
  getWeather().then(getMarkupWeather);
}

export { onSuccess, onError };
export { getWeather };
