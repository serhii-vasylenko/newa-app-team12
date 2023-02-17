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

// const bodyScrollLock = require('body-scroll-lock');
// import debounce from 'lodash.debounce';

const toggleMenu = () => {
  const isMenuOpen =
  openMenu.getAttribute('aria-expanded') === 'true' || false;
  openMenu.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');

  if (themeContainer.classList.contains('mobile')) {
    themeContainer.classList.remove('mobile');
  } else if (!themeContainer.classList.contains('mobile')) {
    const debouncedThemeContainer = debounce(() => {
      themeContainer.classList.add('mobile');
    }, 250);

    debouncedThemeContainer();
  }

  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';

  bodyScrollLock[scrollLockMethod](document.body);
};

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenu.classList.remove('is-open');
  openMenu.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
});

// if (window.innerWidth < 768) {
//   seachBtn.setAttribute('type', 'button');
// }