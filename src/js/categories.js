const throttle = require('lodash.throttle');
import { getCategoryNews } from './getCategoryNews.js';
import {
  markupCategories,
  markupNameButton,
} from './markups/markupCategoriesNews.js';
//import function get Date from Calendar

const categoriesMenu = document.querySelector('.category__menu');
const categoriesBtn = document.querySelector('#btn-open-category');
const categoriesList = document.querySelector('.buttons-list');
const categoriesContainer = document.querySelector('.category');

let categoriesBtnRigthMargin = saveMargin();

markupCategories(categoriesMenu);
markupNameButton();

categoriesBtn.addEventListener('click', onToggleCategoriesMenu);
categoriesMenu.addEventListener('click', onSearchNewsMenu);
categoriesList.addEventListener('click', onSearchNewsBtn);
window.addEventListener('resize', throttle(clearCategoriesMenu, 300));

function onToggleCategoriesMenu() {
  const isMenuOpen =
    categoriesBtn.getAttribute('aria-expanded') === 'true' || false;
  categoriesBtn.setAttribute('aria-expanded', !isMenuOpen);
  categoriesMenu.classList.toggle('is-open-categories');
}

window.onclick = event => {
  if (!event.target.matches('.category__btn')) {
    if (!event.target.matches('.btn-item')) {
      if (categoriesMenu.classList.contains('is-open-categories')) {
        categoriesMenu.classList.remove('is-open-categories');
      }
    }
  }
};

function onSearchNewsBtn(event) {
  const currentButtonCategory = event.target.dataset.btn;
  getCategoryNews(currentButtonCategory);
}

export function divideArrNews(categories, count) {
  const categoriesArrs = [];
  categoriesArrs.push(categories.slice(0, count));
  categoriesArrs.push(categories.slice(count));
  return categoriesArrs;
}

function clearCategoriesMenu() {
  saveMargin();
  markupNameButton();
  markupCategories(categoriesMenu);
  categoriesMenu.classList.remove('is-open-categories');
  categoriesBtn.setAttribute('aria-expanded', false);
}

function onSearchNewsMenu(event) {
  const sizeCategoriesBtn = categoriesBtn.offsetWidth;
  
  const currentButtonCategory = event.target.dataset.btn;
  const currentButtonValue = event.target.innerText;
  getCategoryNews(currentButtonCategory);

  markupNameButton(decodeURIComponent(currentButtonValue));
  categoriesMenu.classList.remove('is-open-categories');
  categoriesBtn.focus();
  changeMarginBetweenCalendar (sizeCategoriesBtn);
}

function changeMarginBetweenCalendar (sizeCategoriesBtn) {
  let newMarginRight = 0;
   categoriesBtnRigthMargin = saveMargin();
  const container = sizeCategoriesBtn + categoriesBtnRigthMargin;
  console.log("sizeCategoriesBtn", sizeCategoriesBtn)
 console.log(" categoriesBtnRigthMargin", categoriesBtnRigthMargin)
 console.log("container", container)
 const currentSizeCategoriesBtn = categoriesBtn.offsetWidth;
 console.log("🚀 ~ file: categories.js:83 ~ changeMarginBetweenCalendar ~ sizeCategoriesBtn", sizeCategoriesBtn)
 console.log("🚀 ~ file: categories.js:83 ~ changeMarginBetweenCalendar ~ currentSizeCategoriesBtn", currentSizeCategoriesBtn)
 const differenceMargin = currentSizeCategoriesBtn-sizeCategoriesBtn;
 
 if(differenceMargin >= 0 && (categoriesBtnRigthMargin - differenceMargin) >categoriesBtnRigthMargin){
  newMarginRight = ((newMarginRight-categoriesBtnRigthMargin) + categoriesBtnRigthMargin + 5);
 }
 else {newMarginRight = categoriesBtnRigthMargin - differenceMargin;}
  

//  if(differenceMargin < 0){
//   newMarginRight = container - currentSizeCategoriesBtn;
//   if (newMarginRight > categoriesBtnRigthMargin) {
//     newMarginRight = (differenceMargin-categoriesBtnRigthMargin) + categoriesBtnRigthMargin + 5;
//  }
  
//  }
 console.log("🚀 ~ file: categories.js:76 ~ changeMarginBetweenCalendar ~ newMarginRight", newMarginRight)
 categoriesContainer.style.marginRight = `${newMarginRight}px`;
 console.log("🚀 ~ file: categories.js:76 ~ changeMarginBetweenCalendar ~ categoriesContainer.style.marginRight", categoriesContainer.style.marginRight)
 console.log("margin Fin", getComputedStyle(categoriesContainer).marginRight);

}


function pxToNumber (str) {
  return Number(str.slice(0, 2));
}

function saveMargin () {
  return pxToNumber(getComputedStyle(categoriesContainer).marginRight);
}