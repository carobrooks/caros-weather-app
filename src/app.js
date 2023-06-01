let daysOfWeek = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

function displayTimeAndDay(timezoneOffset) {
  let currentDayTime = document.querySelector("#current-day-time");
  // this line creates a JS date object representing the current date and time.
  let currentTime = new Date();
  // this line gets the number of milliseconds from the Unix Epoch to the current time by calling the getTime method on the currentTime Date object, and stores that value in the utcTimeInMS variable.
  let utcTimeInMS = currentTime.getTime();
  // since the timezone offset was given in seconds and JS date objects operate in milliseconds, we convert the offset to milliseconds.
  let timezoneOffsetInMS = timezoneOffset * 1000;
  // this line creates a new date object that represents the current date and time in the city you're looking at. it does this by adding the timezone offset (in milliseconds) to the UTC time (in milliseconds).
  let cityTime = new Date(utcTimeInMS + timezoneOffsetInMS);

  let daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let dayOfWeek = daysOfWeek[cityTime.getUTCDay()];
  let hours = cityTime.getUTCHours();
  let minutes = cityTime.getUTCMinutes();
  let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // this line updates the HTML element selected at the beginning of the function with the day of the week and time.
  currentDayTime.innerHTML = `${dayOfWeek} ${hours}:${formattedMinutes}`;

  // this line uses a ternary operator to determine if it's day or night based on the current hours.
  let timeOfDay = hours >= 6 && hours < 19 ? "day" : "night"; // It's "day" from 6AM to 7PM, "night" otherwise

  return timeOfDay;
}

function askAndAnswer(response) {
  let question1 = document.querySelector("#example-q-1");
  let question2 = document.querySelector("#example-q-2");
  let question3 = document.querySelector("#example-q-3");

  let answer1 = document.querySelector("#example-a-1");
  let answer2 = document.querySelector("#example-a-2");
  let answer3 = document.querySelector("#example-a-3");

  let todaysTemp = Math.round(response.data.main.temp);
  let todaysWind = Math.round(response.data.wind.speed);
  let todaysHumidity = Math.round(response.data.main.humidity);

  let questionsAndAnswers = {
    qAndA1: { question: "", answer: "" },
    qAndA2: { question: "", answer: "" },
    qAndA3: { question: "", answer: "" },
  };

  if (todaysTemp >= 85) {
    questionsAndAnswers.qAndA1.question = `so, is it a jeans-and-t-shirt kinda vibe?`;
    questionsAndAnswers.qAndA1.answer = `if by jeans you mean cut-offs and by t-shirt you mean a tank top, then it's totally a jeans-and-t-shirt kind of day. i mean, it'll be ${todaysTemp}°f, after all.`;
  } else if (todaysTemp >= 53) {
    questionsAndAnswers.qAndA1.question = `will i regret lugging a jacket with me?`;
    questionsAndAnswers.qAndA1.answer = `i mean, if you regret being prepared, then maybe. but you can grab a light one - it'll just be ${todaysTemp}°f out today!`;
  } else if (todaysTemp >= 33) {
    questionsAndAnswers.qAndA1.question = `is today the day i should rock my new scarf?`;
    questionsAndAnswers.qAndA1.answer = `today is indeed the day, with the temp at a cool ${todaysTemp}°f! rock your winter gear.`;
  } else {
    questionsAndAnswers.qAndA1.question = `will i regret stepping outside?`;
    questionsAndAnswers.qAndA1.answer = `only if you forget your thermal underwear, hat, gloves, ear muffs, hand warmers, double socks, and heavy-duty boots! it's gonna be a frigid ${todaysTemp}°f!`;
  }

  if (todaysWind >= 15.5) {
    questionsAndAnswers.qAndA2.question = `how about a picnic today?`;
    questionsAndAnswers.qAndA2.answer = `if you like your sandwiches with a side of wind, then go for it. if that's not your thing, picnic inside, bb. the wind will be rolling in at a cool ${todaysWind}mph.`;
  } else if (todaysWind >= 8) {
    questionsAndAnswers.qAndA2.question = `will my hair get caught in my lip gloss?`;
    questionsAndAnswers.qAndA2.answer = `as long as you're not jamming out to a head-banger, you're probably good. today's wind is blowing at ${todaysWind}mph.`;
  } else {
    questionsAndAnswers.qAndA2.question = `should i host a candelit dinner al fresco? the wind will be at a low ${todaysWind}mph.`;
    questionsAndAnswers.qAndA2.answer = `light the candles, bb!`;
  }

  if (todaysHumidity >= 65) {
    questionsAndAnswers.qAndA3.question = `should i go for a jog today?`;
    questionsAndAnswers.qAndA3.answer = `if you're a sucker for a steam bath, get on the starting line! otherwise, stick to indoor activities. the humidity level will be at a whopping ${todaysHumidity}%.`;
  } else if (todaysHumidity >= 55) {
    questionsAndAnswers.qAndA3.question = `could i hang my clothes out to dry today?`;
    questionsAndAnswers.qAndA3.answer = `if you're patient, go ahead. it might take a while with a humidity level of ${todaysHumidity}%.`;
  } else {
    questionsAndAnswers.qAndA3.question = `should i slather on the lotion and oils today?`;
    questionsAndAnswers.qAndA3.answer = `yes, your future self will thank you. it's a dry one today, bb, with a humidity level of only ${todaysHumidity}%.`;
  }

  question1.innerHTML = questionsAndAnswers.qAndA1.question;
  question2.innerHTML = questionsAndAnswers.qAndA2.question;
  question3.innerHTML = questionsAndAnswers.qAndA3.question;

  answer1.innerHTML = questionsAndAnswers.qAndA1.answer;
  answer2.innerHTML = questionsAndAnswers.qAndA2.answer;
  answer3.innerHTML = questionsAndAnswers.qAndA3.answer;

  let showAnswer1 = false;

  question1.addEventListener("click", function (event) {
    console.log("Question 1 clicked");
    event.preventDefault();

    if (showAnswer1) {
      answer1.style.display = "none";
    } else {
      answer1.style.display = "block";
    }
    showAnswer1 = !showAnswer1;
    console.log("showAnswer1:", showAnswer1);
  });

  answer1.addEventListener("click", function (event) {
    event.preventDefault();
    answer1.style.display = "none";
    showAnswer1 = false;
  });

  let showAnswer2 = false;

  question2.addEventListener("click", function (event) {
    console.log("Question 2 clicked");
    event.preventDefault();

    if (showAnswer2) {
      answer2.style.display = "none";
    } else {
      answer2.style.display = "block";
    }
    showAnswer2 = !showAnswer2;
    console.log("showAnswer2:", showAnswer2);
  });

  answer2.addEventListener("click", function (event) {
    event.preventDefault();
    answer2.style.display = "none";
    showAnswer2 = false;
  });

  let showAnswer3 = false;

  question3.addEventListener("click", function (event) {
    console.log("Question 3 clicked");
    event.preventDefault();

    if (showAnswer3) {
      answer3.style.display = "none";
    } else {
      answer3.style.display = "block";
    }
    showAnswer3 = !showAnswer3;
    console.log("showAnswer3:", showAnswer3);
  });

  answer3.addEventListener("click", function (event) {
    event.preventDefault();
    answer3.style.display = "none";
    showAnswer3 = false;
  });
  return questionsAndAnswers;
}

function displayWeatherIcon(description, timeOfDay) {
  let iconElement = document.querySelector(".big-weather-icon");

  if (typeof descriptionToIcon[description] === "object") {
    iconName = descriptionToIcon[description][timeOfDay];
  } else {
    iconName = descriptionToIcon[description];
  }

  iconElement.src = `src/icons/${iconName}.svg`;
}

function displayForecastDays(currentTime, timezoneOffset) {
  let forecastDays = document.querySelectorAll(".day-labels span");
  let nextFiveDays = [];
  let daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  let cityTime = new Date((currentTime + timezoneOffset) * 1000);

  // i'm creating a for loop that will repeat five times for the five forecasted days. `let i = 1;` is setting up a counter to keep track of how many times the code has repeated.
  //  `i <= 5;` is the condition for continuing the loop, so if `i` is less than or equal to 5, the code will repeat again. `i++` means we increase `i` by 1 each time we finish the loop.
  for (let i = 1; i <= 5; i++) {
    // this line is creating a new Date object. It's taking the date and time from `cityTime` (which is another date object), and making a new Date object with the same date and time.
    let forecastDate = new Date(cityTime);
    // this line is changing the day of the month of our new Date object. it's getting the current day of the month from 'cityTime`, adding `i` to it, and setting that as the new day of the month for `forecastDate`. because `i` increases by 1 each time the code repeats, this will give us the day of the month for tomorrow, the next day, and so on, up to 5 days from now.
    forecastDate.setDate(cityTime.getDate() + i);
    // i'm pushing the day of the week of `forecastDate` to the end of the `nextFiveDays` array. so after each loop, `nextFiveDays` gets a new item, representing the day of the week of `forecastDate`, until it eventually holds the next 5 days of the week.
    nextFiveDays.push(forecastDate.getUTCDay());
  }

  // this is called a forEach loop - a way of repeating some code for each item in an array. here, it's repeating the code for each item in the `nextFiveDays` array and then setting the inner HTML of the `forecastDays` elements. in the code it repeats, `day` refers to the current item and `index` refers to the position of that item in the array.
  forecastDays.forEach((day, index) => {
    // this line changes the HTML inside each `day` element. it's setting the HTML to be a string representing the name of the day of the week. it gets this string from the `daysOfWeek` array, using the `index` position in the `nextFiveDays` array as the reference for the day of the week.
    day.innerHTML = daysOfWeek[nextFiveDays[index]];
  });
}

function searchForACity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let city = document.querySelector("#city");
  let simplyPut = document.querySelector("#simply");

  if (searchInput.value) {
    city.innerHTML = `${searchInput.value.toUpperCase()}`;
    getWeatherOfCity(searchInput.value);
  } else {
    city.innerHTML = `SOMEWHERE IN THE WORLD`;
    simplyPut.innerHTML = `simply put, you need a destination`;
    alert("Surely you want to go somewhere!");
  }
}

function getWeatherOfCity(cityName) {
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

const descriptionToColor = {
  "clear sky": {
    day: { background: "#84AFCE", text: "#000000" },
    night: { background: "#475E77", text: "#FFFFFF" },
  },
  "few clouds": {
    day: { background: "#C3C7C9", text: "#000000" },
    night: { background: "#828589", text: "#FFFFFF" },
  },
  "scattered clouds": { background: "#828589", text: "#000000" },
  "overcast clouds": { background: "#828589", text: "#000000" },
  "broken clouds": { background: "#305770", text: "#000000" },
  "light rain": {
    day: { background: "#C3C7C9", text: "#000000" },
    night: { background: "#305770", text: "#FFFFFF" },
  },
  "shower rain": {
    day: { background: "#C3C7C9", text: "#000000" },
    night: { background: "#305770", text: "#FFFFFF" },
  },
  "moderate rain": {
    day: { background: "#C3C7C9", text: "#000000" },
    night: { background: "#305770", text: "#FFFFFF" },
  },
  rain: {
    day: { background: "#C3C7C9", text: "#000000" },
    night: { background: "#305770", text: "#FFFFFF" },
  },
  thunderstorm: { background: "#305770", text: "#000000" },
  snow: { background: "#FFFFFF", text: "#000000" },
  mist: { background: "#C3C7C9", text: "#000000" },
  smoke: { background: "#C3C7C9", text: "#000000" },
  haze: { background: "#C3C7C9", text: "#000000" },
  fog: { background: "#C3C7C9", text: "#000000" },
  tornado: { background: "#305770", text: "#000000" },
};

const descriptionToIcon = {
  "clear sky": { day: "clear-sky-day", night: "clear-sky-night" },
  "few clouds": { day: "few-clouds-day", night: "few-clouds-night" },
  "scattered clouds": { day: "clouds-day", night: "clouds-night" },
  "overcast clouds": { day: "clouds-day", night: "clouds-night" },
  "broken clouds": { day: "clouds-day", night: "clouds-night" },
  "shower rain": { day: "rain-day", night: "rain-night" },
  "light rain": { day: "rain-day", night: "rain-night" },
  "moderate rain": { day: "rain-day", night: "rain-night" },
  rain: { day: "rain-day", night: "rain-night" },
  drizzle: { day: "rain-day", night: "rain-night" },
  thunderstorm: { day: "thunderstorm-day", night: "thunderstorm-night" },
  snow: { day: "snow-day", night: "snow-night" },
  mist: { day: "mist-day", night: "mist-night" },
  smoke: { day: "mist-day", night: "mist-night" },
  haze: { day: "mist-day", night: "mist-night" },
  fog: { day: "mist-day", night: "mist-night" },
  tornado: "tornado",
};

// this function calls `displayTimeAndDay(response.data.timezone)`, displayForecastDays(response.data.dt, response.data.timezone)`, and `displayWeatherIcon(resopnse.data.weather[0].description, timeOfDay)`.
// where the weather data is displayed, and the time and day are updated.
function showTemperature(response) {
  console.log(response);

  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}°f`;

  let weatherDescription = response.data.weather[0].description;
  let simplyPut = document.querySelector("#simply");
  simplyPut.innerHTML = `simply put...${weatherDescription}.`;

  let timeOfDay = displayTimeAndDay(response.data.timezone);
  displayForecastDays(response.data.dt, response.data.timezone);

  displayWeatherIcon(response.data.weather[0].description, timeOfDay);

  askAndAnswer(response);

  let colors;
  if (typeof descriptionToColor[weatherDescription] === "object") {
    if (descriptionToColor[weatherDescription][timeOfDay]) {
      colors = descriptionToColor[weatherDescription][timeOfDay];
    } else {
      colors = descriptionToColor[weatherDescription];
    }
  } else {
    colors = {
      background: descriptionToColor[weatherDescription],
      text: "#000000",
    };
  }
  let card = document.querySelector(".card");
  card.style.backgroundColor = colors.background;
  card.style.color = colors.text;

  let colorClasses = [
    ".day-and-city",
    ".simply-put",
    ".big-degrees",
    ".example-question-1",
    ".example-question-2",
    ".example-question-3",
    ".example-answer-1",
    ".example-answer-2",
    ".example-answer-3",
    ".prefer-celsius",
    ".rain-temp-wind",
    ".temp-labels",
    ".time-labels",
    ".day-labels",
    ".five-day-forecast",
    ".somewhere-else-link",
    "button",
    "form",
    ".a-look-ahead",
  ];
  colorClasses.forEach(function (cssClass) {
    let elements = document.querySelectorAll(cssClass);
    elements.forEach(function (element) {
      element.style.color = colors.text;
    });
  });
}

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", searchForACity);

let searchInput = document.querySelector("#city-search-input");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === "Return") {
    event.preventDefault();
    searchForACity(event);
    document.querySelector("#city-search-button").classList.add("clicked");
    setTimeout(function () {
      document.querySelector("#city-search-button").classList.remove("clicked");
    }, 150);
  }
});

let hideForm = true;
let searchLink = document.querySelector("#to-search-or-not");
searchLink.addEventListener("click", function (event) {
  event.preventDefault();

  if (hideForm) {
    searchLink.innerHTML = "i'm done travel-dreaming for now";
    cityForm.classList.remove("search-form");
  } else {
    searchLink.innerHTML = "got somewhere else in mind?";
    cityForm.classList.add("search-form");
  }
  hideForm = !hideForm;
});

// ---------------------------------------------------------------------------------------------------
// this function gets the current position of the user using the Geolocation API, fetches the weather data for the current location, and then calls `showTemperature(response)` to display the weather.
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
    alert(
      "hm. looks like the geolocation isn't working atm. check back later!"
    );
  }
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

// ------------------------------------------------------------------------------------------------------

let temperature = document.querySelector("#temperature");
let toggleTemp = document.querySelector("#toggle-temp");
let isFahrenheit = true;

toggleTemp.addEventListener("click", function (event) {
  event.preventDefault();

  if (isFahrenheit) {
    let fahrenheit = parseFloat(temperature.textContent);
    let celsius = (fahrenheit - 32) * (5 / 9);
    temperature.textContent = `${celsius.toFixed(0)}°c`;
    toggleTemp.textContent = "back to fahrenheit";
  } else {
    let celsius = parseFloat(temperature.textContent);
    let fahrenheit = celsius * (9 / 5) + 32;
    temperature.textContent = `${fahrenheit.toFixed(0)}°f`;
    toggleTemp.textContent = "i prefer celsius";
  }

  isFahrenheit = !isFahrenheit;
});

// first function that runs when the page loads. it fetches and displays the weather for LA.
getWeatherOfCity("Los Angeles");

// TESTS FOR VARIOUS CONDITIONS:
// RAIN
// let mockResponseRain = {
//   data: {
//     main: {
//       temp: 50,
//     },
//     weather: [
//       {
//         description: "rain",
//       },
//     ],
//     timezone: "America/New_York",
//     dt: 1603123947,
//   },
// };

// // Call your function with the mock response
// showTemperature(mockResponseRain);

// SNOW
// let mockResponseSnow = {
//   data: {
//     main: {
//       temp: 30,
//     },
//     weather: [
//       {
//         description: "snow",
//       },
//     ],
//     timezone: "America/New_York",
//     dt: 1603123947,
//   },
// };

// // Call your function with the mock response for snow
// showTemperature(mockResponseSnow);

// CLEAR SKY
// let mockResponseClear = {
//   data: {
//     main: {
//       temp: 30,
//     },
//     weather: [
//       {
//         description: "clear sky",
//       },
//     ],
//     timezone: "America/New_York",
//     dt: 1603123947,
//   },
// };

// // // Call your function with the mock response for snow
// showTemperature(mockResponseClear);

// code i'm scared to delete!
// question1.addEventListener("click", function (event) {
//   event.preventDefault();
//   question1.style.display = "block";
//   answer1.style.display = "block";
// });

// answer1.addEventListener("click", function (event) {
//   event.preventDefault();
//   question1.style.display = "block";
//   answer1.style.display = "none";
// });

//   if (hideAnswer1) {
//     // this shouldn't be hard-coded here, i don't think. it should be populated with whichever question the askAndAnswer function has provided, based on the weather API response.
//     question1.innerHTML = questionsAndAnswers.qAndA1.answer;
//     question1.classList.remove("example-question-1");
//   } else {
//     question1.innerHTML = questionsAndAnswers.qAndA1.question;
//     question1.classList.add("example-question-1");
//   }
//   hideAnswer1 = !hideAnswer1;
// });

// question2.addEventListener("click", function (event) {
//   event.preventDefault();
//   question2.style.display = "block";
//   answer2.style.display = "block";
// });

// answer2.addEventListener("click", function (event) {
//   event.preventDefault();
//   question2.style.display = "block";
//   answer2.style.display = "none";
// });

// if (hideAnswer2) {
//   question2.innerHTML = questionsAndAnswers.qAndA2.answer;
//   question2.classList.remove("example-question-2");
// } else {
//   question2.innerHTML = questionsAndAnswers.qAndA2.question;
//   question2.classList.add("example-question-2");
// }
// hideAnswer2 = !hideAnswer2;

// question3.addEventListener("click", function (event) {
//   event.preventDefault();
//   question3.style.display = "block";
//   answer3.style.display = "block";
// });

// answer3.addEventListener("click", function (event) {
//   event.preventDefault();
//   question3.style.display = "block";
//   answer3.style.display = "none";
// });

//   if (hideAnswer3) {
//     question3.innerHTML = questionsAndAnswers.qAndA3.answer;
//     question3.classList.remove("example-question-3");
//   } else {
//     question3.innerHTML = questionsAndAnswers.qAndA3.question;
//     question3.classList.add("example-question-3");
//   }
//   hideAnswer3 = !hideAnswer3;
// });
