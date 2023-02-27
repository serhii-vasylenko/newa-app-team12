import { onSuccess, onError } from './api/weatherApi';

getGeolocation();

function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}

export { getGeolocation };
