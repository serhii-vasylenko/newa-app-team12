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
  if (themeContainer.classList.contains('mobile')) {
    themeContainer.classList.remove('mobile');
  } else if (!themeContainer.classList.contains('mobile')) {
    const debouncedThemeContainer = debounce(() => {
      themeContainer.classList.add('mobile');
    }, 250);

    debouncedThemeContainer();
  }
};

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

