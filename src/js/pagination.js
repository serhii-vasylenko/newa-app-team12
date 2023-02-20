const paginationEl = document.getElementById('pagination');
const btnNextPg = document.querySelector('.next-btn');
const btnPrevPg = document.querySelector('.prev-btn');
// console.log(paginationEl, btnNextPg, btnPrevPg);

const results = [];

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  countPages: 0,
  totalPages: results.length,  
};

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

window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
  if (!e.matches) return;
  valuePage.countPages = 4;
  chunkArray(results, valuePage.countPages)
});

window
  .matchMedia('(min-width: 768px)' && '(max-width: 1279px)')
  .addEventListener('change', e => {
    if (!e.matches) return;
    valuePage.countPages = 7;
    chunkArray(results, valuePage.countPages)
  });

window.matchMedia('(min-width: 1280px)').addEventListener('change', e => {
  if (!e.matches) return;
  valuePage.countPages = 8;
  chunkArray(results, valuePage.countPages)
});

paginationEl.addEventListener('click', e => {
  const ele = e.target;
  // console.log(ele);
  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);
    
    valuePage.curPage = pageNumber;
    pagination(valuePage);
    
    handleButtonLeft();
    handleButtonRight();
  }
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