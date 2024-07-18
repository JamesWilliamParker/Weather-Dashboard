// API Key for OpenWeatherMap
const APIKey = "5839972b293a2bb4a4def3084d9f3d38";

// Grab all the important elements from the DOM
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const storedCities = JSON.parse(localStorage.getItem("cities")) || []; // Load stored cities or || start fresh
const cityNameButtonContainer = document.getElementById("cityNameButtonContainer");
const forecastContainer = document.getElementById("forecastContainer");
const container = document.getElementById("container");

// Set up the event listener for the search button
searchButton.addEventListener("click", function () {
  const cityName = searchInput.value.trim(); // Clean up the city name input
  fetchWeatherData(cityName); // Fetch the weather data for the city
});

// Function to fetch weather data from the API
function fetchWeatherData(cityName) {
  const units = "imperial"; // Temperature in Fahrenheit
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${APIKey}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Something went wrong with the response"); // Handle errors if the response is bad
      }
      return response.json();
    })
    .then(data => {
      console.log("Weather data:", data); // Log the data we got back
      renderCurrentWeather(data); // Show the current weather
      renderFiveDayForecast(data.list); // Show the 5-day forecast
      storeSearchHistory(cityName); // Save this city in our history
    })
    .catch(error => {
      console.error("There was a problem with the fetch:", error); // Handle fetch errors
    });
}

// Function to display the current weather
function renderCurrentWeather(weatherData) {
  const cityName = weatherData.city.name;
  const date = new Date(weatherData.list[0].dt * 1000).toLocaleDateString();
  const temperature = weatherData.list[0].main.temp;
  const windSpeed = weatherData.list[0].wind.speed;
  const humidity = weatherData.list[0].main.humidity;
  const weatherIcon = weatherData.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

  container.innerHTML = ""; // Clear out old data

  // Create & append new elements for the current weather
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

// Function to display the 5-day weather forecast
function renderFiveDayForecast(forecastData) {
  forecastContainer.innerHTML = ''; // Clears any previous forecast

  const uniqueDays = []; // Tracks unique dates for the forecast

  forecastData.forEach(dayForecast => {
    const date = new Date(dayForecast.dt * 1000).toLocaleDateString();

    // Checks to see if the date is already used: to avoid repetition
    if (!uniqueDays.includes(date)) {
      uniqueDays.push(date);

      const temp = dayForecast.main.temp;
      const wind = dayForecast.wind.speed;
      const humid = dayForecast.main.humidity;
      const icon = dayForecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

      const forecastDiv = document.createElement("div");
      forecastDiv.classList.add("forecast-item");

      // Create & add elements for this day’s forecast
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

      // Stops after showing 5 unique days
      if (uniqueDays.length === 5) return;
    }
  });
}

// Function to save search history
function storeSearchHistory(cityName) {
  if (!storedCities.includes(cityName)) {
    storedCities.push(cityName); // Adds the new city to our list
    localStorage.setItem("cities", JSON.stringify(storedCities)); // Save the list to localStorage
    renderSearchHistoryButtons(); // Update the buttons with the new list
  }
}

// Function to render buttons for each city in the search history
function renderSearchHistoryButtons() {
  cityNameButtonContainer.innerHTML = ''; // Clears old history buttons
  storedCities.forEach(city => {
    const button = document.createElement("button");
    button.textContent = city;
    button.classList.add("history-btn");
    button.addEventListener("click", () => fetchWeatherData(city)); // Fetches weather for the city when button is clicked
    cityNameButtonContainer.appendChild(button);
  });
}

// Renders the search history buttons when the page loads
renderSearchHistoryButtons();
