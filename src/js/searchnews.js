import Notiflix from "notiflix";
import SearchNews from "./api-searchnews";


const searchNews = new SearchNews() ;

async function getNews(){
    try{
        const newSearch = await searchNews.searchNewsImg()
    if (newSearch===0){
        Notiflix.Notify .failure("sorry")
    }
    else {
        createMarkup(newSearch)
    }
}
catch(err){
    onError(err)
    console.log (err)
}}

function onError(err) {
    console.log (err);
}
getNews();

