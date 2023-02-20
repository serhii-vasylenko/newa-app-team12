import {getPopularNewsAPI} from './api/news-api.js';
import {newsTemplate} from '../templates/card-news.hbs';
// import {newslistMarkup} from './markups/weather-markup.js';

const popularNewsGallery = document.querySelector('.news-gallery');

 async function getPopoularProduct () {
   
    // const getNews = await getPopularNewsAPI();
    // console.log("Arr objects with mostpopular News ", getNews.results);
    // // markupNews(getNews.result)    function markup News
    // const newsArr = getNews.result;

    
    // popularNewsGallery.insertAdjacentHTML('beforeend', newsTemplate({abstract, media, published_date, subsection, title, url}));

}
    

getPopoularProduct (); 

