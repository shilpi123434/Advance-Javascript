// Querying all the required HTML elements
const searchELe = document.querySelector(".search-box");
const cityEle = document.querySelector(".city");
const dateEle = document.querySelector(".date");
const tempEle = document.querySelector(".temp");
const weatherEle = document.querySelector(".weather");
const tempRangeEle = document.querySelector(".hi-low");

// Creating the open weather API object
const weatherAPI = {
  baseURL: "https://api.openweathermap.org/data/2.5/weather?units=metric",
  key: "4280efee6963dcc78d0339e0419424d8",
};

searchELe.addEventListener("keypress", updateDetails);

function updateDetails(e) {
  if (e.keyCode == 13) fetchWeatherData(searchELe.value);
}

function fetchWeatherData(city) {
  fetch(`${weatherAPI.baseURL}&q=${city}&appid=${weatherAPI.key}`)
    .then((response) => response.json())
    .then((response) => addWeatherData(response));
}

function addWeatherData(weatherData) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (weatherData.sys.country == "IN") weatherData.sys.country = "India";

  cityEle.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;

  dateEle.innerHTML = `${days[date.getDay()]} ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  tempEle.innerHTML = Math.round(weatherData.main.temp) + "<span>°c</span>";

  weatherEle.innerHTML = weatherData.weather[0].main;

  tempRangeEle.innerHTML = `${Math.round(
    weatherData.main.temp_min
  )}°c / ${Math.round(weatherData.main.temp_max)}°c`;
}