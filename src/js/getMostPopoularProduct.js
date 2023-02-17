import API from './API.js';
//import function markup News

 async function getmostPopoularProduct () {
    const getNews = await API('viewed', 30, 'v2', 'mostpopular');
    console.log("Arr objects with mostpopular News ", getNews.results);
    // markupNews(getNews.result)    function markup News
}
    

getmostPopoularProduct (); 

