import { getPopularNewsAPI } from './api/news-api.js';

const paginationEl = document.getElementById('pagination');
const btnNextPg = document.querySelector('.next-btn');
const btnPrevPg = document.querySelector('.prev-btn');
// console.log(paginationEl, btnNextPg, btnPrevPg);

const results = [];

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  countPages: 0,
  totalPages: 10,
};
// getPopularNewsAPI();
// console.log(
// '🚀 ~ file: pagination.js:17 ~ getPopularNewsAPI:',
// getPopularNewsAPI
// );
pagination();

// розбиваємо масив отриманих даних

function chunkArray(arrayData, chunkSize) {
  while (arrayData.length) {
    results.push(arrayData.splice(0, chunkSize));
  }

  return results;
}

// const qqqqqq = chunkArray([1,2,3,4,5,6,7,8], 3);
// console.log(qqqqqq);
function getAmountCards() {
  if (window.innerWidth < 768) {
    valuePage.countPages = 4;
  }

  if (window.innerWidth > 768 && window.innerWidth < 1280) {
    valuePage.countPages = 7;
  }

  if (window.innerWidth >= 1280) {
    valuePage.countPages = 8;
  }
}

function getAmountCardsDynamic() {
  window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
    if (!e.matches) return;
    valuePage.countPages = 4;
  });

  window
    .matchMedia('(min-width: 768px)' && '(max-width: 1279px)')
    .addEventListener('change', e => {
      if (!e.matches) return;
      valuePage.countPages = 7;
    });

  window.matchMedia('(min-width: 1280px)').addEventListener('change', e => {
    if (!e.matches) return;
    valuePage.countPages = 8;
  });
}

getAmountCardsDynamic();
console.log(
  '🚀 ~ file: pagination.js:17 ~ getAmountCardsDynamic:',
  valuePage.countPages
);

paginationEl.addEventListener('click', e => {
  const ele = e.target;
  // console.log(ele);

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);
    valuePage.curPage = pageNumber;    
  } 

  getAmountCards();
    console.log('getAmountCards:', valuePage.countPages);

    async function getPopoularProduct() {
      const getNews = await getPopularNewsAPI();
      // console.log('getNews.results', getNews.results);

      valuePage.totalPages = Math.ceil(
        getNews.results.length / valuePage.countPages
      );
      // console.log('getNews.results.length', valuePage.totalPages);

      chunkArray(getNews.results, valuePage.countPages);
      // console.log('chunkArray',chunkArray(getNews.results, valuePage.countPages));

      for (let i = 0; i <= results.length; i += 1) {
        // console.log(results[i]);
        if (valuePage.curPage === i + 1) {
          console.log('page', results[i]);
          // markupNews(getNews.result)    function markup News
          break
        }
      }

      pagination(valuePage);

      handleButtonLeft();
      handleButtonRight();
    }
    getPopoularProduct();
});

// DYNAMIC PAGINATION
function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4; // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dot = `<button class="pagination__btn-points">...</button>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    paginationEl.innerHTML = renderTwoSide;
  } else {
    paginationEl.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <button class="pagination__btn pagination__btn-num ${active}"  data-page="${index}">${index}</button>`;
}

document
  .querySelector('.pagination__container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

function handleButton(element) {
  if (element.classList.contains('prev-btn')) {
    valuePage.curPage -= 1;
    // console.log(valuePage.curPage);
    handleButtonLeft();
    btnNextPg.disabled = false;
  } else if (element.classList.contains('next-btn')) {
    valuePage.curPage += 1;
    // console.log(valuePage.curPage);
    handleButtonRight();
    btnPrevPg.disabled = false;
  }
  pagination();
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnPrevPg.disabled = true;
    btnNextPg.disabled = false;
  } else {
    btnPrevPg.disabled = false;
  }
}

function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    //  console.log(valuePage.curPage);
    btnNextPg.disabled = true;
    btnPrevPg.disabled = false;
  } else {
    btnNextPg.disabled = false;
  }
}
// window.scrollTo(0, 0);
