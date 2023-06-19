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

  let container = document.querySelector("#example-answer-container");

  let todaysTemp = Math.round(response.data.main.temp);
  let todaysWind = Math.round(response.data.wind.speed);
  let todaysHumidity = Math.round(response.data.main.humidity);

  let questionsAndAnswers = {
    qAndA1: { question: "", answer: "" },
    qAndA2: { question: "", answer: "" },
    qAndA3: { question: "", answer: "" },
  };

  if (todaysTemp >= 78) {
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
    questionsAndAnswers.qAndA2.question = `should i host a candelit dinner al fresco?`;
    questionsAndAnswers.qAndA2.answer = `light the candles, bb! the wind will be at a low ${todaysWind}mph.`;
  }

  if (todaysHumidity >= 65) {
    questionsAndAnswers.qAndA3.question = `should i go for a jog today?`;
    questionsAndAnswers.qAndA3.answer = `if you're a sucker for a steam bath, get on the starting line! the humidity level will be at a whopping ${todaysHumidity}%.`;
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

  let questions = [question1, question2, question3];
  let answers = [answer1, answer2, answer3];

  function hideAllAnswers() {
    answers.forEach((answer) => {
      answer.classList.remove("active");
    });
  }

  let setActive = throttle((index) => {
    answers[index].classList.add("active");
    container.classList.add("active");
  }, 200);

  questions.forEach((question, index) => {
    question.addEventListener("mouseover", function () {
      hideAllAnswers();
      setActive(index);
    });

    question.addEventListener("mouseout", function () {
      answers[index].classList.remove("active");
      container.classList.remove("active");
    });
  });

  return questionsAndAnswers;
}

//   let showAnswer1 = false;
//   // this boolean variable will be used to track weather or not (lol) the answer is currently being displayed.

//   question1.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (showAnswer1) {
//       answer1.style.display = "none";
//     } else {
//       answer1.style.display = "block";
//     }
//     showAnswer1 = !showAnswer1;
//   });

//   answer1.addEventListener("click", function (event) {
//     event.preventDefault();
//     answer1.style.display = "none";
//     showAnswer1 = false;
//   });

//   let showAnswer2 = false;

//   question2.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (showAnswer2) {
//       answer2.style.display = "none";
//     } else {
//       answer2.style.display = "block";
//     }
//     showAnswer2 = !showAnswer2;
//   });

//   answer2.addEventListener("click", function (event) {
//     event.preventDefault();
//     answer2.style.display = "none";
//     showAnswer2 = false;
//   });

//   let showAnswer3 = false;

//   question3.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (showAnswer3) {
//       answer3.style.display = "none";
//     } else {
//       answer3.style.display = "block";
//     }
//     showAnswer3 = !showAnswer3;
//   });

//   answer3.addEventListener("click", function (event) {
//     event.preventDefault();
//     answer3.style.display = "none";
//     showAnswer3 = false;
//   });
//   return questionsAndAnswers;
// }

function displayWeatherIcon(description, timeOfDay) {
  let iconElement = document.querySelector(".big-weather-icon");

  if (typeof descriptionToIcon[description] === "object") {
    iconName = descriptionToIcon[description][timeOfDay];
  } else {
    iconName = descriptionToIcon[description];
  }

  iconElement.src = `src/icons/${iconName}.svg`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let noonForecasts = response.data.list.filter((forecast) => {
    return forecast.dt_txt.includes("12:00:00");
  });
  console.log(noonForecasts);

  noonForecasts.forEach((forecast) => {
    console.log(forecast);
  });
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row day-container justify-content-center">`;
  noonForecasts.forEach((forecastDay, index) => {
    if (index < 6) {
      let iconName;
      if (
        typeof descriptionToIcon[forecastDay.weather[0].description] ===
        "object"
      ) {
        iconName = descriptionToIcon[forecastDay.weather[0].description]["day"];
      } else {
        iconName = descriptionToIcon[forecastDay.weather[0].description];
      }
      let iconSrc = `src/icons/${iconName}.svg`;

      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 text-center">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img src="${iconSrc}" alt="${
          forecastDay.weather[0].description
        }" width="48" />
          <div class="forecast-temps">
            <span class="forecast-max">${Math.round(
              forecastDay.main.temp_max
            )}°</span>

          </div>
        </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

  axios.get(apiUrl).then((response) => {
    document.body.style.display = "block";
    showTemperature(response);
  });
}

const descriptionToColor = {
  "clear sky": {
    day: {
      body: "rgba(249, 200, 117, 0.5)",
      background: "rgba(249, 200, 117, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(250, 176, 60, 1)",
    },
    night: {
      body: "rgba(94, 104, 159, 0.45)",
      background: "rgba(75, 90, 156, 0.68)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(75, 90, 156, 1)",
    },
  },
  "few clouds": {
    day: {
      body: "rgba(167, 167, 167, 1)",
      background: "rgba(217, 217, 217, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(90, 98, 117, 1)",
    },
    night: {
      body: "rgba(79, 122, 156, 0.65)",
      background: "rgba(49, 49, 89, 0.55)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(42, 66, 85, 1)",
    },
  },
  "scattered clouds": {
    day: {
      body: "rgba(167, 167, 167, 1)",
      background: "rgba(217, 217, 217, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(90, 98, 117, 1)",
    },
    night: {
      body: "rgba(79, 122, 156, 0.65)",
      background: "rgba(79, 122, 156, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(42, 66, 85, 1)",
    },
  },
  "overcast clouds": {
    day: {
      body: "rgba(167, 167, 167, 1)",
      background: "rgba(217, 217, 217, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(90, 98, 117, 1)",
    },
    night: {
      body: "rgba(79, 122, 156, 0.65)",
      background: "rgba(79, 122, 156, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(42, 66, 85, 1)",
    },
  },
  "broken clouds": {
    day: {
      body: "rgba(167, 167, 167, 1)",
      background: "rgba(217, 217, 217, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(90, 98, 117, 1)",
    },
    night: {
      body: "rgba(79, 122, 156, 0.65)",
      background: "rgba(79, 122, 156, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(42, 66, 85, 1)",
    },
  },
  "light rain": {
    day: {
      body: "rgba(77, 135, 161, 0.64)",
      background: "rgba(77, 135, 161, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(50, 87, 104, 1)",
    },
    night: {
      body: "rgba(95, 111, 168, 0.45)",
      background: "rgba(57, 57, 145, 0.33)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(57, 57, 145, 1)",
    },
  },
  "shower rain": {
    day: {
      body: "rgba(77, 135, 161, 0.64)",
      background: "rgba(77, 135, 161, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(50, 87, 104, 1)",
    },
    night: {
      body: "rgba(95, 111, 168, 0.45)",
      background: "rgba(57, 57, 145, 0.33)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(57, 57, 145, 1)",
    },
  },
  "moderate rain": {
    day: {
      body: "rgba(77, 135, 161, 0.64)",
      background: "rgba(77, 135, 161, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(50, 87, 104, 1)",
    },
    night: {
      body: "rgba(95, 111, 168, 0.45)",
      background: "rgba(57, 57, 145, 0.33)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(57, 57, 145, 1)",
    },
  },
  rain: {
    day: {
      body: "rgba(77, 135, 161, 0.64)",
      background: "rgba(77, 135, 161, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(50, 87, 104, 1)",
    },
    night: {
      body: "rgba(95, 111, 168, 0.45)",
      background: "rgba(57, 57, 145, 0.33)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(57, 57, 145, 1)",
    },
  },
  thunderstorm: {
    day: {
      body: "rgba(139, 143, 145, 0.42)",
      background: "rgba(132, 132, 132, 0.56)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(132, 132, 132, 1)",
    },
    night: {
      body: "rgba(54, 94, 125, 0.45)",
      background: "rgba(54, 94, 125, 0.56)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(43, 77, 102, 1)",
    },
  },
  snow: {
    day: {
      body: "rgba(177, 219, 252, 0.19)",
      background: "rgba(177, 219, 252, 0.33)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(0, 90, 160, 1)",
    },
    night: {
      body: "rgba(43, 126, 190, 0.65)",
      background: "rgba(38, 124, 188, 0.85)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(19, 65, 99, 1)",
    },
  },
  mist: {
    day: {
      body: "rgba(215, 234, 248, 0.45)",
      background: "rgba(215, 234, 248, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(66, 100, 126, 1)",
    },
    night: {
      body: "rgba(71, 81, 109, 0.45)",
      background: "rgba(48, 58, 89, 0.65)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(48, 58, 89, 1)",
    },
  },
  smoke: {
    day: {
      body: "rgba(215, 234, 248, 0.45)",
      background: "rgba(215, 234, 248, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(66, 100, 126, 1)",
    },
    night: {
      body: "rgba(71, 81, 109, 0.45)",
      background: "rgba(48, 58, 89, 0.65)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(48, 58, 89, 1)",
    },
  },
  haze: {
    day: {
      body: "rgba(215, 234, 248, 0.45)",
      background: "rgba(215, 234, 248, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(66, 100, 126, 1)",
    },
    night: {
      body: "rgba(71, 81, 109, 0.45)",
      background: "rgba(48, 58, 89, 0.65)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(48, 58, 89, 1)",
    },
  },
  fog: {
    day: {
      body: "rgba(215, 234, 248, 0.45)",
      background: "rgba(215, 234, 248, 1)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(66, 100, 126, 1)",
    },
    night: {
      body: "rgba(71, 81, 109, 0.45)",
      background: "rgba(48, 58, 89, 0.65)",
      text: "rgba(0, 0, 0, 1)",
      border: "rgba(48, 58, 89, 1)",
    },
  },
  tornado: {
    body: "rgba(145, 180, 200, 0.45)",
    background: "rgba(132, 171, 193, 0.65)",
    text: "rgba(0, 0, 0, 1)",
    border: "rgba(92, 124, 141, 1)",
  },
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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  displayWeatherIcon(response.data.weather[0].description, timeOfDay);

  askAndAnswer(response);

  getForecast(response.data.coord);

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
  card.style.borderColor = colors.border;
  card.style.color = colors.text;

  let body = document.querySelector("body");
  body.style.backgroundColor = colors.body;

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

function throttle(func, wait) {
  let timeout = null;
  let callbackArgs = null;

  return function (...args) {
    const context = this; // Store the context
    callbackArgs = args; // Store the arguments

    if (!timeout) {
      // If no timeout is set
      timeout = setTimeout(() => {
        func.apply(context, callbackArgs); // Call the function with the last provided arguments
        timeout = null; // Reset the timeout
      }, wait);
    }
  };
}

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
