import { onSuccess, onError } from './api/weather-api';

const locationBtn = document.querySelector('#get_location_btn');
locationBtn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}
