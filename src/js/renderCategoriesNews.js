import {getCategoriesAPI} from './API.js';
import {getCategoryNews} from './getCategoryNews.js'
//import function get Date from Calendar

const categoriesMenu = document.querySelector('.category__menu');
const categoriesBtn = document.querySelector('.category__btn');

markupCategories();

categoriesBtn.addEventListener('click', onToggleCategoriesMenu);
categoriesMenu.addEventListener('click', onSearchNews);


async function markupCategories() {
  const getCategories = await getCategoriesAPI();
  const categories = getCategories.results;
  categoriesMenu.innerHTML = categories
    .map(({ section, display_name }) => {
      return `<li class='category__item'><button class="btn-item" data-btn=${encoded(
        section
      )}>${display_name}</button></li>`;
    })
    .join(' ');
}

function onToggleCategoriesMenu() {
  const isMenuOpen =
    categoriesBtn.getAttribute('aria-expanded') === 'true' || false;
  categoriesBtn.setAttribute('aria-expanded', !isMenuOpen);
  categoriesMenu.classList.toggle('is-open-categories');
}

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  categoriesMenu.classList.remove('is-open-categories');
  categoriesBtn.setAttribute('aria-expanded', false);
});

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

function encoded(string) {
  return encodeURIComponent(string);
}


