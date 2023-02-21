import SearchNews from "./api/api-newssearch";

const newsGallery = document.querySelector('.news-gallery');

const pageNotFound = document.querySelector(".not-found");
const input = document.querySelector('.search-form__input');
input.addEventListener('submit', onEnterPush);


const searchNews = new SearchNews();

function onEnterPush (e) {
  e.preventDefault () 
  const input = e.currentTarget ;
  searchNews.searchQuery=input.elements.searchQuery.value.trim();
  clearImgList ();
  searchNews.resetPage();
  searchNewsImg();
}

async function searchNewsImg() {
  try {
  const getNews = await searchNews.searchNewsImg();
  console.log('Arr objects with search News ', getNews.results);
  //const resArr = getNews.results;
  newsGallery.innerHTML = addMarkup()

if (getNews.length) {
  pageNotFound.classList.add("visually-hidden");
  addMarkup(getNews);
} else if (getNews.length === 0) {
  notFound();
}
}
catch (err){
  notFound(err)}
}

function addMarkup(data) {
  return data.map(({ abstract, media, published_date, subsection, title, url }) => {

      let mediaURL = "https://amsrus.ru/wp-content/uploads/2016/02/Mercedes-Benz-C63-AMG-Black-Series-1.jpg";

      if (media && media[0] && media[0]["media-metadata"] && media[0]["media-metadata"][2]) {
          mediaURL = media[0]["media-metadata"][2].url;
        }
  return `
  <li class="card-news__item card__readed">
  <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
    <p class="news-category"> ${subsection}</p>
    <button class="news-favorite" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16" height="16"><use href="../images/icons-defs.svg#icon-heart-transparent"></use></svg>
    </button>
  </div>
  <div class="card-news__info">
    <h3 class="card-news__title"> ${title}</h3>
    <p class="card-news__info"> ${abstract}...</p>
    <div class="card-information">
      <div class="card-infrmation__data"> ${published_date}</div>
      <a class="card__infotion__more" href="${url}">Read more</a>
    </div>
  </div>
  <div class="owerlay-readed is-hidden">
    <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
  </div>
</li>`}).join('')

}




function notFound() {
  if (pageNotFound.classList.contains("visually-hidden")) {
    newsGallery.innerHTML = " ";
    pageNotFound.classList.remove("visually-hidden");
  }
}














/*import { getSearchNewsAPI } from './api/news-api.js';

const newsGallery = document.querySelector('.news-gallery');

const pageNotFound = document.querySelector(".not-found");
const input = document.querySelector('.search-form__input');
input.addEventListener('submit', onEnterPush);

function onEnterPush(e) {
    const query = e.target.value;
    getSearchNews(query);
  }

  async function getSearchNews() {
    try {
    const getNews = await getSearchNewsAPI();
    console.log('Arr objects with search News ', getNews.results);
    const resArr = getNews.results;
    newsGallery.innerHTML = addMarkup(resArr)

  if (resArr.length) {
    pageNotFound.classList.add("visually-hidden");
    addMarkup();
  } else if (resArr.length === 0) {
    notFound();
  }
}
  catch (err){
    notFound(err)}
  }
  // --> section not-found

  function notFound() {
    if (pageNotFound.classList.contains("visually-hidden")) {
      newsGallery.innerHTML = " ";
      pageNotFound.classList.remove("visually-hidden");
    }
  }

  
    function addMarkup(data) {
      return data.map(({ abstract, media, published_date, subsection, title, url }) => {
  
          let mediaURL = "https://amsrus.ru/wp-content/uploads/2016/02/Mercedes-Benz-C63-AMG-Black-Series-1.jpg";
  
          if (media && media[0] && media[0]["media-metadata"] && media[0]["media-metadata"][2]) {
              mediaURL = media[0]["media-metadata"][2].url;
            }
      return `
      <li class="card-news__item card__readed">
      <div class="card-news__picture"><img src="${mediaURL}" alt="${media[0]?.caption}" class="news-image">
        <p class="news-category"> ${subsection}</p>
        <button class="news-favorite" aria-label="add to favorite">Add to favorite <svg class="news-favorite__icon" width="16" height="16"><use href="../images/icons-defs.svg#icon-heart-transparent"></use></svg>
        </button>
      </div>
      <div class="card-news__info">
        <h3 class="card-news__title"> ${title}</h3>
        <p class="card-news__info"> ${abstract}...</p>
        <div class="card-information">
          <div class="card-infrmation__data"> ${published_date}</div>
          <a class="card__infotion__more" href="${url}">Read more</a>
        </div>
      </div>
      <div class="owerlay-readed is-hidden">
        <p class="owerlay-readed__info" aria-label="readed">Already read <svg class="owerlay-readed__icon" width="18"  height="18"><use href="../images/icons-defs.svg#icon-readed"></use></svg></p>
      </div>
    </li>`}).join('')
    
  }
  
  
 /* function addMarkup(tagString) {
  newsGallery.innerHTML = '';
  newsGallery.insertAdjacentHTML('beforeend', tagString);
  }*/



