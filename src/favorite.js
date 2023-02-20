import './js/switch';
import './js/markups/changeCurrentClass';

const gallery = document.querySelector('.favorite-gallery__list');

window.addEventListener('DOMContentLoaded', createGallery);
gallery.addEventListener('click', removeFromFavorite);

function createGallery() {
  try {
    const storageData = JSON.parse(localStorage.getItem('favorite'));
    const galleryMarkup = storageData.reduce((previousValue, obj) => {
      return previousValue + obj.markup;
    }, '');
    gallery.innerHTML = galleryMarkup;
  } catch {
    console.log('LocalStorage is empty!');
  }
}

function removeFromFavorite({ target }) {
  if (
    target.nodeName === 'BUTTON' &&
    target.classList.contains('removeFromFavoriteBtn')
  ) {
    const storageData = JSON.parse(localStorage.getItem('favorite'));

    const indexOfDelEl = storageData.findIndex(
      obj => obj.markup === target.parentNode.outerHTML
    );
    storageData.splice(indexOfDelEl, 1);
    localStorage.setItem('favorite', JSON.stringify(storageData));
    target.parentNode.outerHTML = '';
  }
}
