import {getPopularNewsAPI} from './API.js';
//import function markup News

 async function getPopoularProduct () {
   
    const getNews = await getPopularNewsAPI();
    console.log("Arr objects with mostpopular News ", getNews.results);
    // markupNews(getNews.result)    function markup News
}
    

getPopoularProduct (); 

