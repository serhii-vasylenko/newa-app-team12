
// import {getPopularNewsAPI} from './api/news-api.js';
// // import {newsTemplate} from '../templates/card-news.hbs';

// const popularNewsGallery = document.querySelector('.news-gallery');
// const notFoundPage = document.querySelector('.not-found');

// async function getPopularProduct() {
    
//    try {
//     const getNews = await getPopularNewsAPI();
//     console.log("Arr objects with mostpopular News", getNews.results);
    
//      const newsArr = getNews.results;
//     popularNewsGallery.innerHTML = markup(newsArr);
//    } catch (error) {
//     notFoundPage.classList.toggle('visually-hidden');
//    }
//  }

// getPopularProduct();
// function markup(data) {
//     return data.map(({ abstract, media, published_date, subsection, title, url }) => {

//         let mediaURL = "https://amsrus.ru/wp-content/uploads/2016/02/Mercedes-Benz-C63-AMG-Black-Series-1.jpg";

//         if (media && media[0] && media[0]["media-metadata"] && media[0]["media-metadata"][2]) {
//             mediaURL = media[0]["media-metadata"][2].url;
//           }
//     return `
//     <li class="card-news__item card__readed">
//     <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
//       <p class="news-category"> ${subsection}</p>
//       <button class="news-favorite" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16" height="16"><use href="../images/icons-defs.svg#icon-heart-transparent"></use></svg>
//       </button>
//     </div>
//     <div class="card-news__info">
//       <h3 class="card-news__title"> ${title}</h3>
//       <p class="card-news__info"> ${abstract}...</p>
//       <div class="card-information">
//         <div class="card-infrmation__data"> ${published_date}</div>
//         <a class="card__infotion__more" href="${url}">Read more</a>
//       </div>
//     </div>
//     <div class="owerlay-readed is-hidden">
//       <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
//     </div>
//   </li>`}).join('')
  
// }