import {getCategoriesAPI} from '../api/news-api.js';


export async function markupCategories(categoriesMenu) {
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

function encoded(string) {
  return encodeURIComponent(string);
}

