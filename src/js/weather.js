import { onSuccess, onSuccessToWeek, onError } from './api/weather-api';
import { addClassToCard, removeClassToCard } from './markups/weather-markup';

function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    removeClassToCard();
  }
}

function onClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccessToWeek, onError);
    addClassToCard();
  }
}

export { onClick, onSubmit };
export { getGeolocation };
