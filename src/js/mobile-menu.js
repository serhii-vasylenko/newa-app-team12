const mobileMenu = document.querySelector('.js-menu-container');
const openMenu = document.querySelector('.js-open-menu');
const closeMenu = document.querySelector('.js-close-menu');
// const chekBox = document.querySelector('.theme');

const bodyScrollLock = require('body-scroll-lock');
// import debounce from 'lodash.debounce';
const toggleMenu = () => {
  const openMobileMenu =
    openMenu.getAttribute('aria-expanded') === 'true' || false;
    openMenu.setAttribute('aria-expanded', !openMobileMenu );
    mobileMenu.classList.toggle('is-open');

  const scrollLockMethod = !openMobileMenu 
    ? 'disableBodyScroll' : 'enableBodyScroll';

  bodyScrollLock[scrollLockMethod](document.body);

  
  if (chekBox.classList.contains('mobile')) {
    chekBox.classList.remove('mobile');
  } else if (!chekBox.classList.contains('mobile')) {
    const debouncedChekBox = debounce(() => {
      chekBox.classList.add('mobile');
    }, 250);

    debouncedChekBox();
  }
  
  
};

const title = document.querySelector('meta[name="description"]').content.toLowerCase();
const links = document.querySelectorAll('.nav-mobile__link');

links.forEach(link => {
  if (link.innerText.toLowerCase() === title) {
    link.classList.add('nav-mobile__link--current');
  }
});


// const toggleMenu = () => {
//   mobileMenu.classList.toggle('is-open');

// };

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
