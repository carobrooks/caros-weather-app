// WEEK 3 HOMEWORK //

// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//     clothes_hair: "so don't forget your sweater and prepare for a frizzy hair day!",
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//     clothes_hair: "so don't forget your sweater! your hair should be fine today",
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//     clothes_hair: "so wear cooler clothes and trust that you're gonna have a good hair day!",    
//   },
//   dallas: {
//     temp: 20.9,
//     humidity: 100,
//     clothes_hair: "so don't forget your sweater and prepare for your hair to POOF!",

//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//     clothes_hair: "so don't forget your winter coat, scarf, and hat. at least your hair won't frizz up!",

//   },
//   houston: {
//     temp: 32,
//     humidity: 67,
//     clothes_hair: "so don't forget to wear cool clothes and some anti-frizz hair product!",

//   },
//   "los angeles": {
//     temp: 27,
//     humidity: 28,
//     clothes_hair: "so rock some shorts and wear your hair up!",

//   },
//   "san francisco": {
//     temp: 19,
//     humidity: 54,
//     clothes_hair: "so don't forget a light sweater. I see a good hair day in your future.",

//   },
//   "cape town": {
//     temp: 38,
//     humidity: 78,
//     clothes_hair: "so don't forget your water bottle and shorts. Oh, and put that anti-frizz product to WERK.",

//   },
// };

// function displayWeather(city, capitalizedCity) {
//   if (weather.hasOwnProperty(city)) {
//     let temp = weather[city].temp;
//     let humidity = weather[city].humidity;
//     let clothes = weather[city].clothes_hair;
//     let temp_c = Math.round(temp);
//     let temp_f = Math.round((temp * 9) / 5 + 32);
//     return `It is currently ${temp_c}°C (${temp_f}°F) in ${capitalizedCity} with a humidity level of ${humidity}%, ${clothes}`;
//   } else {
//     return `Bummer! We don't know the weather for this city, but you can check out https://www.google.com/search?q=weather+${city} for that info. Remember, if it's a warm day and the humidity is over 70%, put that anti-frizz product to WERK!`;
//   }
// }

// function capCity(string) {
//   return string
//     .split(' ') // Split the string into words
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
//     .join(' '); // Join the words back together
// }

// function getUserCity() {
//   let userCity = prompt("Tell me a city and I'll tell you what to expect.");
//   let trimmedCity = userCity.trim().toLowerCase();
//   let capitalizedCity = capCity(trimmedCity);
//   let response = displayWeather(trimmedCity, capitalizedCity);
//   alert(response);
// }

// getUserCity()

let currentDayTime = document.querySelector("#current-day-time");
let today = new Date();
let daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
let dayOfWeek = daysOfWeek[today.getDay()];
let minutes = today.getMinutes();
let formattedMinutes = minutes < 10 ? `0${minutes}`:minutes;

currentDayTime.innerHTML =`${dayOfWeek} ${today.getHours()}:${formattedMinutes}`;

// ------------------------------------------------------------------------------------------------------

function searchForACity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let city = document.querySelector("#city");
  let simplyPut = document.querySelector("#simply");

  if(searchInput.value) {
    city.innerHTML = `${searchInput.value.toUpperCase()}`;
    getWeatherOfCity(searchInput.value);
  } else {
    city.innerHTML=`SOMEWHERE IN THE WORLD`;
    simplyPut.innerHTML = `simply put, you need a destination`;
    alert("Surely you want to go somewhere!")
  }
}

function getWeatherOfCity(cityName) {
  let units = "imperial";
    let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

function showDefaultWeather() {
  getWeatherOfCity("New York");
}

showDefaultWeather();

function showTemperature(response) {
    console.log(response);

    let temp = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${temp}°f`;

    let weatherDescription = response.data.weather[0].description;
    let simplyPut = document.querySelector("#simply");
    simplyPut.innerHTML = `simply put...${weatherDescription}.`;

    setWeatherIcon(weatherDescription);
}

function setWeatherIcon(description) {
  let iconElement = document.querySelector("big-weather-icon");
  let formattedDescription = description.replace(/ /g, "_").toLowerCase();
  iconElement.src = `src/icons/${formattedDescription}.svg`;
}

// ----------------------------------------------------------------------------------------------------

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", searchForACity);

let searchInput = document.querySelector("#city-search-input");
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === "Return") {
    event.preventDefault();
    searchForACity(event);
    document.querySelector("#city-search-button").classList.add("clicked");
    setTimeout(function(){
    document.querySelector("#city-search-button").classList.remove("clicked");
    }, 150)
  }
});

let hideForm = true;
let searchLink = document.querySelector("#to-search-or-not");
searchLink.addEventListener("click", function(event) {
  event.preventDefault(); 

  if (hideForm) {
    searchLink.innerHTML = "i'm done travel-dreaming for now";
    cityForm.classList.remove("search-form")
  } else {
    searchLink.innerHTML = "got somewhere else in mind?";
    cityForm.classList.add("search-form")
  }
  hideForm = !hideForm;
});

// ---------------------------------------------------------------------------------------------------

function getPosition(response) {
  console.log(response);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "imperial";
    let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(function (response) {
    let cityName = response.data.name.toUpperCase();
    city.innerHTML = `${cityName}`;
    // alternative way of writing the above line: document.getElementById("city").innerHTML = cityName;
    showTemperature(response);
  }); 
});
} else {
  alert("hm. looks like the geolocation isn't working atm. check back later!");
  }
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

navigator.geolocation.getCurrentPosition(getPosition);

// ------------------------------------------------------------------------------------------------------

let temperature = document.querySelector("#temperature");
let toggleTemp = document.querySelector("#toggle-temp");
let isFahrenheit = true;

toggleTemp.addEventListener("click", function(event) {
  event.preventDefault();
  
  if (isFahrenheit) {
    let fahrenheit = parseFloat(temperature.textContent);
    let celsius = (fahrenheit - 32) * (5 / 9);
    temperature.textContent = `${celsius.toFixed(0)}°c`;
    toggleTemp.textContent = "back to fahrenheit";
  } else {
    let celsius = parseFloat(temperature.textContent);
    let fahrenheit = (celsius * (9 / 5)) + 32;
    temperature.textContent = `${fahrenheit.toFixed(0)}°f`;
    toggleTemp.textContent = "i prefer celsius";
  }

  isFahrenheit = !isFahrenheit;
});

let forecastDays = document.querySelectorAll(".day-labels span");
let nextFiveDays = [];

for (let i = 1; i <= 5; i++) {
  let forecastDate = new Date();
  forecastDate.setDate(today.getDate() + i);
  nextFiveDays.push(forecastDate.getDay());
}

forecastDays.forEach((day, index) => {
  day.innerHTML = daysOfWeek[nextFiveDays[index]];
});







// WEATHER ICON LEGEND! openweathermap api description = svg file
// 'clear sky' = clear-sky-day/clear-sky-night
// 'few clouds' = few-clouds-day/few-clouds-night
// 'scattered clouds & broken clouds' = clouds-day/clouds-night
// 'shower rain & rain & drizzle' = rain-day/rain-night
// 'thunderstorm' = thunderstorm-day/thunderstorm-night
// 'snow' = snow-day/snow-night
// 'mist' = mist-day/mist-night
// 'tornado' = tornado



// TODO 5/12/23!!!!! 
// 1) make sure you understand the five-day forecast code before moving on to week 5! SLASH work on understanding this over the next few weeks



// let path = 'users/1'

// fetch(root + '/' + path)
//   .then(response => (
//     response.json()
//   ))
//   .then(json => (
//     console.log(json)
//   ));



// function make4() {
//   return 2 + 2
// }

// const make4 = () => {
//   return 2 + 2
// }

// const make4 = () => (2 + 2)

// const make4 = () => 2 + 2

// const fetchPromise = fetch(url);
// const jsonPromise = fetchPromise.then(response => response.json())