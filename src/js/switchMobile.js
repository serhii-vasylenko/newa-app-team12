const checkBox = document.querySelector('.theme-switch__checkbox');
const mobileCheck = document.querySelector('.theme-switch-mobile');
checkBox.addEventListener('change', toggleTheme);
mobileCheck.addEventListener('change', toggleThemeMobile);

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

function toggleThemeMobile() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}