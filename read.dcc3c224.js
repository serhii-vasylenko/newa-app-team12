var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o("8FnLx"),o("4QsFx"),o("9narg");const r=Array.from(document.querySelectorAll(".nav-list__link")),i=window.location.href;function l(){let e=document.getElementsByClassName("revision-date-btn");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active-revision-date");let e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"}))}r.map((e=>{const t=e.innerHTML.toLowerCase();i.includes(t)?e.classList.add("current"):e.classList.remove("current")}));const a=document.querySelector(".revision-date-container"),s=/^[0-3]\d\/\d+\/\d\d\d\d$/;window.addEventListener("DOMContentLoaded",(function(){for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t.match(s)&&a.insertAdjacentHTML("afterbegin",`<div>\n        <button type="button" class="revision-date-btn">${t}\n          <svg class="icon-arrow">\n            <use href="./images/arrow.svg#icon-arrow"></use>\n          </svg>\n        </button>\n        <ul class="container-for-viewed-cards">\n        </ul>\n        </div>`);const n=document.querySelector(".container-for-viewed-cards");try{const e=JSON.parse(localStorage.getItem(t)).reduce(((e,t)=>e+t.markup),"");n.insertAdjacentHTML("afterbegin",e)}catch{console.log("LocalStorage is empty!")}}l()}));
//# sourceMappingURL=read.dcc3c224.js.map
