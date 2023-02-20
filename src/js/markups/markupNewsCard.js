import { getPopularNewsAPI } from '.././api/news-api';
import cardNews from '../../templates/card-news.hbs';


refs = {
  newsGalery: document.querySelector('.news-gallery')
}


function appendMarkupCard({ abstract, media, published_date, subsection, title, url }) {

  refs.newsGalery.insertAdjacentHTML('beforeend', cardNews(abstract, media, published_date, subsection, title, url));

}

appendMarkupCard(getPopularNewsAPI);
