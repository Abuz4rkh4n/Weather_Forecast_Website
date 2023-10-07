const toggleBar = document.querySelector(".toggle-bar");
const dropDownMenu = document.querySelector(".main-menu");
const frontWeather = document.querySelector(".front-weather");

toggleBar.onclick = function () {
  dropDownMenu.classList.toggle("open");
  frontWeather.classList.toggle("open");
};
