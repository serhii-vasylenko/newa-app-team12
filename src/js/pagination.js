const paginationEl = document.getElementById('pagination');
const paginationContainerEl = document.querySelector('.pagination__container');
const btnNextPg = document.querySelector('.next-btn');
const btnPrevPg = document.querySelector('.prev-btn');
const searchFormEl = document.querySelector('.search-form');
// console.log(paginationEl, btnNextPg, btnPrevPg);


const results = [];

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 10,
};

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

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// DYNAMIC PAGINATION
function pagination(valuePage) {
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

function getAmountCardsDynamic() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    valuePage.amountCards = 4;
  }
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
    valuePage.amountCards = 7;
  }
  if (window.matchMedia('(min-width: 1280px)').matches) {
    valuePage.amountCards = 8;
  }
}

export { pagination };