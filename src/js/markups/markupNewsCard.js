import { getPopularNewsAPI } from '../api/news-api';
import cardNews from '../../templates/card-news.hbs';
import getRefs from '../get-refs';
import { checkFavCards } from '../addAndRemoveFromFavorite';
const refs = getRefs();
// renderNewsMarkup();

// async function renderNewsMarkup() {
//   const getPopularNews = await getPopularNewsAPI();

//   refs.newsGalery.innerHTML = cardNews(getPopularNews.results);
//   checkFavCards();
// }

// refs.favorite.addEventListener('click', onFavotiteNews);

// const readedNews = document.querySelector('.owerlay-readed');
// const readMore = document.querySelector('card__infotion__more')

// readMore.addEventListener("click", isReadedNews)

// // function onFavotiteNews() {
// //   console.log("onFavotiteNews");
// // }

// function isReadedNews(e) {
//   console.log(e)
//   readed.setAttribute("background - color", "rgba(244, 244, 244, 0.4)");
//   // console.log('isReadedNews');
// }
