import { getSearchNewsAPI } from './api/news-api.js';

// example function search News

async function getSearchNews(search) {
  const getNews = await getSearchNewsAPI(search);
  console.log('Arr objects with search News ', getNews.response.docs);
  //function filter Date
  // function markup News
}

getSearchNews('cat');
