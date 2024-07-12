const APIKey = "5839972b293a2bb4a4def3084d9f3d38";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
const cityNameButtonContainer = document.getElementById("cityNameButtonContainer");
const forecastContainer = document.getElementById("forecastContainer");
const container = document.getElementById("container");

// Set Up Event Listeners:
searchButton.addEventListener("click", function () {
  const cityName = searchInput.value.trim();
  fetchWeatherData(cityName);
});

// Fetch Weather Data:
function fetchWeatherData(cityName) {
  const units = "imperial";
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${APIKey}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Response error");
      }
      return response.json();
    })
    .then(data => {
      console.log("Weather data:", data);
      renderCurrentWeather(data); // Render current weather
      renderFiveDayForecast(data.list); // Render 5-day forecast
      storeSearchHistory(cityName); // Store search history
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

// Render Current Weather:
function renderCurrentWeather(weatherData) {
  const cityName = weatherData.city.name;
  const date = new Date(weatherData.list[0].dt * 1000).toLocaleDateString();
  const temperature = weatherData.list[0].main.temp;
  const windSpeed = weatherData.list[0].wind.speed;
  const humidity = weatherData.list[0].main.humidity;
  const weatherIcon = weatherData.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

  container.innerHTML = "";

  const cityHeader = document.createElement("h2");
  cityHeader.textContent = `${cityName} (${date})`;

  const temperatureParagraph = document.createElement("p");
  temperatureParagraph.textContent = `Temperature: ${temperature} °F`;

  const windSpeedParagraph = document.createElement("p");
  windSpeedParagraph.textContent = `Wind Speed: ${windSpeed} MPH`;

  const humidityParagraph = document.createElement("p");
  humidityParagraph.textContent = `Humidity: ${humidity} %`;

  const iconImage = document.createElement("img");
  iconImage.setAttribute("src", iconUrl);
  iconImage.setAttribute("alt", weatherData.list[0].weather[0].description);

  container.append(cityHeader, iconImage, temperatureParagraph, windSpeedParagraph, humidityParagraph);
}

// Render 5-Day Forecast:
function renderFiveDayForecast(forecastData) {
  forecastContainer.innerHTML = ''; // Clears previous content.

  // This will make it so it takes 5 entires, 1 per day
  const uniqueDays = [];
  forecastData.forEach(dayForecast => {
    const date = new Date(dayForecast.dt * 1000).toLocaleDateString();

    // Checks to see if this date is already added
    if (!uniqueDays.includes(date)) {
      uniqueDays.push(date);

      const temp = dayForecast.main.temp;
      const wind = dayForecast.wind.speed;
      const humid = dayForecast.main.humidity;
      const icon = dayForecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

      const forecastDiv = document.createElement("div");
      forecastDiv.classList.add("forecast-item");

      const dateElement = document.createElement("p");
      dateElement.textContent = date;

      const tempElement = document.createElement("p");
      tempElement.textContent = `Temperature: ${temp} °F`;

      const windElement = document.createElement("p");
      windElement.textContent = `Wind Speed: ${wind} mph`;

      const humidElement = document.createElement("p");
      humidElement.textContent = `Humidity: ${humid} %`;

      const iconImg = document.createElement("img");
      iconImg.setAttribute("src", iconUrl);

      forecastDiv.append(dateElement, tempElement, windElement, humidElement, iconImg);
      forecastContainer.appendChild(forecastDiv);

      // Stops after 5 unique days
      if (uniqueDays.length === 5) return;
    }
  });
}

// Stores Search History:
function storeSearchHistory(cityName) {
  if (!storedCities.includes(cityName)) {
    storedCities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(storedCities));
    renderSearchHistoryButtons();
  }
}

// Renders Search History Buttons:
function renderSearchHistoryButtons() {
  cityNameButtonContainer.innerHTML = '';
  storedCities.forEach(city => {
    const button = document.createElement("button");
    button.textContent = city;
    button.classList.add("history-btn");
    button.addEventListener("click", () => fetchWeatherData(city));
    cityNameButtonContainer.appendChild(button);
  });
}

// Initial rendering of search history buttons:
renderSearchHistoryButtons();
