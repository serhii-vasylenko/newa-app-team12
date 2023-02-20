import { getPopularNewsAPI } from '../api/news-api';
import cardNews from '../../templates/card-news.hbs';
import getRefs from '../get-refs';
import { checkFavCards } from '../addAndRemoveFromFavorite';
const refs = getRefs();
renderNewsMarkup();

async function renderNewsMarkup() {
  const getPopularNews = await getPopularNewsAPI();

  refs.newsGalery.innerHTML = cardNews(getPopularNews.results);
  checkFavCards();
}

// refs.favorite.addEventListener('click', onFavotiteNews);
// refs.readed.addEventListener('click', isReadedNews)

// function onFavotiteNews() {
//   console.log("onFavotiteNews");
// }

// function isReadedNews() {
//   console.log('isReadedNews');
// }
