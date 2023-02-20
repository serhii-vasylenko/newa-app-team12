const search = document.querySelector('.search-form');
const btn = document.querySelector('.search-form__button');
const input = document.querySelector('.search-form__input');

btn.addEventListener('click', () => {
  input.classList.toggle('active')
    
})