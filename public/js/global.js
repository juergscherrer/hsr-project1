(function () {
    const themeChanger = document.getElementById('theme-changer');
    changeTheme();

    function getTheme () {
        let theme = localStorage.getItem("theme");
        if (!theme) {
            localStorage.setItem("theme", "0");
            theme = localStorage.getItem("theme");
        }
        return theme;
    }

    function setTheme(){
        if (localStorage.getItem("theme") === "0"){
            localStorage.setItem("theme", "1");
        } else{
            localStorage.setItem("theme", "0");
        }
    }

    function changeTheme(){
        if (getTheme() === "0"){
            document.documentElement.style.setProperty('--main-color', '#333');
            document.documentElement.style.setProperty('--sec-color', '#fff');
            document.documentElement.style.setProperty('--trd-color', '#eee');
            themeChanger.firstChild.classList.remove('fa-sun');
            themeChanger.firstChild.classList.add('fa-moon');

        } else {
            document.documentElement.style.setProperty('--main-color', '#fff');
            document.documentElement.style.setProperty('--sec-color', '#333');
            document.documentElement.style.setProperty('--trd-color', '#444');
            themeChanger.firstChild.classList.remove('fa-moon');
            themeChanger.firstChild.classList.add('fa-sun');
        }
    }

    themeChanger.addEventListener("click", function(){
        setTheme();
        changeTheme();
    });
})();
