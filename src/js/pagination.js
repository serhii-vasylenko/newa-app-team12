const paginationEl = document.getElementById('pagination');
const btnNextPg = document.querySelector('.next-btn');
const btnPrevPg = document.querySelector('.prev-btn');
// console.log(paginationEl, btnNextPg, btnPrevPg);

let deleteItems = [];
let firstItems = [];
let countPages = 0;

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 10,
};

// функція повертає масив з перших amount елементів і записує всі інші в deleteItems
function getSliceItems(arr, amount) {
  // console.log(arr, amount);
  deleteItems = arr.slice(amount);
  // console.log(deleteItems);
  valuePage.totalPages = arr.length / amount;
  return arr.slice(0, amount);
}

// функція, яка робить розмітку amount елементів популярних новин при завантаженні
function getNewsMarkup(arr, amount) {
  const sliceArray = getSliceItems(arr, amount);

  return (markup = sliceArray.map(item => createOneCard(item)).join(''));
}

let updateDeleteItems = [];
// setTimeout(() => {
//   updateDeleteItems = deleteItems.slice(amount);
// }, 1500);

paginationEl.addEventListener('click', e => {
  handleButton(e.target);

  window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
    if (!e.matches) return;
    countPages = 4;
  });

  window
    .matchMedia('(min-width: 768px)' && '(max-width: 1279px)')
    .addEventListener('change', e => {
      if (!e.matches) return;
      countPages = 7;
    });

  window.matchMedia('(min-width: 1280px)').addEventListener('change', e => {
    if (!e.matches) return;
    countPages = 8;
  });

  switch (valuePage.curPage) {
    case 1:
      newsList.innerHTML = getNewsMarkup(arr, countPages);
      break;
    case 2:
      const sliceItem = deleteItems.slice(0, countPages);
      updateDeleteItems = deleteItems.slice(countPages);

      const markup2 = render(sliceItem);

      // newsList.innerHTML = markup2;
      break;
    case 3:

      break;
  }
  // window.scrollTo(0, 0);
});

pagination();

paginationEl.addEventListener('click', e => {
  const ele = e.target;
  console.log(ele);
  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);
    console.log(pageNumber);
    valuePage.curPage = pageNumber;
    pagination(valuePage);
    console.log(valuePage);
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

// document
//   .querySelector('.pagination__container')
//   .addEventListener('click', function (e) {
//     handleButton(e.target);
//   });

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
