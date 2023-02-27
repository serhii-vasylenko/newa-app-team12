import axios from 'axios';
import { updateWeatherData } from '../markups/weatherMarkup';
import { getPopularProduct } from '../getPopoularProduct';

const URL = 'https://api.openweathermap.org/data/';
const API_KEY = 'ea60bf329e302f40922f2ed0631e5003'; //my key

let api;

async function getWeatherDay() {
  // console.log('this getWeatherDay (1)');
  try {
    const response = await axios.get(`${api}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function onSuccess(position) {
  try {
    const { latitude, longitude } = position.coords;
    api = `${URL}2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    const response = await getWeatherDay();
    updateWeatherData(response);
    getPopularProduct();
  } catch (error) {
    console.log(error);
  }
}

async function onError(error) {
  try {
    api = `${URL}2.5/weather?q=London&units=metric&appid=${API_KEY}`;

    const response = await getWeatherDay();
    updateWeatherData(response);
    getPopularProduct();
  } catch (error) {
    console.log(error);
  }
}

export { onSuccess, onError };
