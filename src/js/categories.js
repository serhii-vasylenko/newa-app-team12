import { getCategoryNews } from './getCategoryNews.js';
import {
  markupCategories,
  markupNameButton,
} from './markups/markupCategoriesNews.js';
//import function get Date from Calendar

const categoriesMenu = document.querySelector('.category__menu');
const categoriesBtn = document.querySelector('#btn-open-category');
const categoriesList = document.querySelector('.buttons-list');

markupCategories(categoriesMenu);
markupNameButton();

categoriesBtn.addEventListener('click', onToggleCategoriesMenu);
categoriesMenu.addEventListener('click', onSearchNews);
categoriesList.addEventListener('click', onSearchNews);

function onToggleCategoriesMenu() {
  const isMenuOpen =
    categoriesBtn.getAttribute('aria-expanded') === 'true' || false;
  categoriesBtn.setAttribute('aria-expanded', !isMenuOpen);
  categoriesMenu.classList.toggle('is-open-categories');
}

// window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
//   if (!e.matches) return;
//   categoriesMenu.classList.remove('is-open-categories');
//   categoriesBtn.setAttribute('aria-expanded', false);
// });

window.onclick = event => {
  if (!event.target.matches('.category__btn')) {
    if (!event.target.matches('.btn-item')) {
      if (categoriesMenu.classList.contains('is-open-categories')) {
        categoriesMenu.classList.remove('is-open-categories');
      }
    }
  }
};

function onSearchNews(event) {
  const currentButtonCategory = event.target.dataset.btn;
  getCategoryNews(currentButtonCategory);
}

export function divideArrNews(categories, count) {
  const categoriesArrs = [];
  categoriesArrs.push(categories.slice(0, count));
  categoriesArrs.push(categories.slice(count));
  return categoriesArrs;
}

window.addEventListener('resize', () => {
  markupNameButton();
  markupCategories(categoriesMenu);
  categoriesMenu.classList.remove('is-open-categories');
  categoriesBtn.setAttribute('aria-expanded', false);
});

