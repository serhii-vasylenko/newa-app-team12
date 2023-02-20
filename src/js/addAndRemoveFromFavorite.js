const newsGallery = document.querySelector('.news-gallery');

const storageData = JSON.parse(localStorage.getItem('favorite'))
  ? JSON.parse(localStorage.getItem('favorite'))
  : [];

window.addEventListener('DOMContentLoaded', checkFavCards);

newsGallery.addEventListener('click', onCardBtnClick);

function onCardBtnClick({ target }) {
  if (
    target.nodeName === 'BUTTON' &&
    target.classList.contains('addToFavoriteBtn')
  ) {
    changeAddBtnToRemoveBtn(target);
    const cardMarkup = {
      firstElOfCard: target.parentNode.firstElementChild.outerHTML,
      markup: target.parentNode.parentNode.outerHTML,
    };
    // const storageData = JSON.parse(localStorage.getItem("favorite"))
    //   ? JSON.parse(localStorage.getItem("favorite"))
    //   : [];
    storageData.push(cardMarkup);
    localStorage.setItem('favorite', JSON.stringify(storageData));
  } else if (
    target.nodeName === 'BUTTON' &&
    target.classList.contains('removeFromFavoriteBtn')
  ) {
    removeCardFromLocalStorage(target);
    changeRemoveBtnToAddBtn(target);
  }
}
function changeAddBtnToRemoveBtn(target) {
  target.classList.replace('addToFavoriteBtn', 'removeFromFavoriteBtn');
  target.innerHTML = 'Remove from favorite';
}
function changeRemoveBtnToAddBtn(target) {
  target.classList.replace('removeFromFavoriteBtn', 'addToFavoriteBtn');
  target.innerHTML = 'Add to favorite';
}
function removeCardFromLocalStorage(target) {
  // const storageData = JSON.parse(localStorage.getItem("favorite"));

  const indexOfDelEl = storageData.findIndex(
    obj => obj.markup === target.parentNode.parentNode.outerHTML
  );

  storageData.splice(indexOfDelEl, 1);
  localStorage.setItem('favorite', JSON.stringify(storageData));
}

function checkFavCards() {
  // const storageData = JSON.parse(localStorage.getItem("favorite"));
  const newsCards = Array.from(document.querySelectorAll('.card-news__item'));
  if (storageData) {
    const firstElOfStorageObj = storageData.map(obj => obj.firstElOfCard);

    const cardsToChange = newsCards.filter(card =>
      firstElOfStorageObj.includes(
        card.firstElementChild.firstElementChild.outerHTML
      )
    );

    cardsToChange.map(item => {
      const card = item.querySelector('.addToFavoriteBtn');

      changeAddBtnToRemoveBtn(card);
    });
  }
}

export { checkFavCards };
