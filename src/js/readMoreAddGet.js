import getRefs from './get-refs';
const refs = getRefs();
const READED_KEY = 'readMore';
let readedNewsArray = [];

// checkLocalStorage();
// setTimeout(() => {
  
//   // console.log(`readedNewsArray: ${readedNewsArray}`);
//   const ckeckedCards = Array.from(refs.newsGalery.querySelectorAll('.card__infotion__more'));
//   const chekedUrls = readedNewsArray.map(el => el.url);
//   console.log(`chekedUrls: ${chekedUrls}`);
//   console.log(ckeckedCards);
//   ckeckedCards.filter(link => chekedUrls.includes(link.href)).forEach(link => link.closest('li.card-news__item').classList.add(`readMore`));
// }, 500)

// refs.newsGalery.addEventListener('click', evt => {
//   const readMoreLInk = evt.target.closest('.card__infotion__more');
//   if (!readMoreLInk) return;
//   readMoreLInk.closest('li.card-news__item').classList.add(`${READED_KEY}`);
//   AddToReadMore(readMoreLInk);
// });
// function checkLocalStorage() {
//   if (JSON.parse(localStorage.getItem(`${READED_KEY}`)) === null) {
//     return;
//   }
//   readedNewsArray = JSON.parse(localStorage.getItem(`${READED_KEY}`));
// }

// function AddToReadMore(readed) {
//   console.log(readed.href);
//   const readedArticle = {
//     url: readed.href,
//   };
//   console.log(readedArticle);
//   for (let i = 0; i < readedNewsArray.length; i += 1) {
//     if (readedNewsArray[i].url === readedArticle.url) return;
//   }
  
//   readedNewsArray.push(readedArticle);
  
//   localStorage.setItem(`${READED_KEY}`, JSON.stringify(readedNewsArray));
// }

// function AddClassToElement(array) {

// }