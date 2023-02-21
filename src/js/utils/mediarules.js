// window.onresize = function (event) {
// };

window.addEventListener('DOMContentLoaded', function () {
  let listItems = document.querySelectorAll('.exemple-card');
  let weatherWidget = document.getElementById('weather-widget');

  if (window.matchMedia('(min-width: 1280px)').matches) {
    listItems[1].parentNode.insertBefore(
      weatherWidget,
      listItems[1].nextSibling
    );
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    listItems[0].parentNode.insertBefore(
      weatherWidget,
      listItems[0].nextSibling
    );
  } else {
    let galleryContainer = document.getElementById('gallery-container');
    galleryContainer.prepend(weatherWidget);
  }
});
