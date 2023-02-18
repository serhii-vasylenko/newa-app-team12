// (() => {
//   const refs = {
//     mobileMenu: document.querySelector('.js-menu-container'),
// openMenu: document.querySelector('.js-open-menu'),
// closeMenu: document.querySelector('.js-close-menu'),
//   };

//   refs.openMenu.addEventListener('click', toggleModal);
//   refs.closeMenu.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.mobileMenu.classList.toggle('is-open');
//   }
// })();


const mobileMenu = document.querySelector('.js-menu-container');
const openMenu = document.querySelector('.js-open-menu');
const closeMenu = document.querySelector('.js-close-menu');
const themeContainer = document.querySelector('.theme');

const toggleMenu = () => {
  mobileMenu.classList.toggle('is-open');
};

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

