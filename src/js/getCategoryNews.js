import { getCategoryNewsAPI } from './api/news-api.js';
//import function rendering cardNews

export async function getCategoryNews(category) {
  const getCategotyNews = await getCategoryNewsAPI(category);
  const dataNews = getCategotyNews.results;
  console.log('Arr objects current category News', dataNews);
  const filteredNews = filterDateNews(dataNews, '2023-2-10'); // get Date from Calendar
  console.log('filter NewsArr to Date', filteredNews);

  //   markupNews(filteredNews)          / get name function for markup
}

function filterDateNews(arrNews, selectedDate) {
  if (selectedDate === null) {                                     // ???????????????????????????
    return arrNews;
  }
  return arrNews.filter(news => {
    return dateConversion(news.published_date) === selectedDate;
  });
}

function dateConversion(getDate) {
  const date = new Date(getDate);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //????????????????????
}
