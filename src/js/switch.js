const checkBox = document.querySelector('.theme-switch__checkbox');

const bodyElem = document.querySelector('body');
checkBox.addEventListener('change', toggleTheme);


function toggleTheme() {
    bodyElem.classList.toggle('theme-dark');
    if (localStorage.getItem('theme') !== 'theme-dark') {
        localStorage.setItem('theme', 'theme-dark');
    } else {
        localStorage.removeItem('theme');
    }
}

(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        bodyElem.classList.add('theme-dark');
        checkBox.checked = true;
    } 
    else {
        checkBox.checked = false;
    }
})();