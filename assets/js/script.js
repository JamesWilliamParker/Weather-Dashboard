const APIKey = '5839972b293a2bb4a4def3084d9f3d38';
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
const cityNameButtonContainer = document.getElementById("container");
// const btnContainer = document.getElementById('buttons');

                    // Set Up Event Listeners:
// Attach a click event listener to the search button to trigger the weather data retrieval process.

// So the variable "searchButton" is going to have an eventlistener "click".
searchButton.addEventListener('click', function() {
    const cityName = searchInput.value.trim();
    // "function" is going to capture this event. And it will be called
    // fetchWeatherData. This can now be used later on. 
    fetchWeatherData(cityName);
    
});


                    // Fetch Weather Data:
// Create a function to fetch weather data from the OpenWeather API using the city name from the search input.

// So the function that captured the click event is now going to be used to fetch weather data from the API.
function fetchWeatherData(cityName) { // The function called "fetchWeatherData", is accepting a parameter called cityName. cityName will represent the data input by the user for the city name they type in the text field. So now this function can fetch the cityName data. This can be reused later with this captured data.
    const APIKey = '5839972b293a2bb4a4def3084d9f3d38'; // API key is stored to make requests to the API.
    const units = 'imperial'; // this is being done to have the temp displayed as fahrenheit.
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${APIKey}`; // The API URL dynamically generates with the correct parameters city name, unit,s and my api key.

    fetch(apiURL) // The fetch function will make a request to the apiURL to fetch the weather data from the API.
        .then(function(response) { // .then is to handle the response from the fetch request. "response" is a parameter that captures the received data from the API request.
            if (!response.ok) { // Checks if the response is not ok, if so there's an error. 
                throw new Error('Response error'); // This is what the error will say.
            }
            return response.json(); // This line parses the content of the response so that the data received from the API converts into a JS object. 
})
    .then(function(data) { // The parsed JSON data received from the API used with the .then block handle.
        console.log('Weather data:', data); // debugging purposes
        renderCurrentWeather(data); // calls the function for displaying or rendering the current weather data on the UI.
        storeSearchHistory(cityName); // This calls the function that will pass cityName as an argument. this function will store the searched city name in local storage. 
    })
    .catch(function(error) { // this will handle any data fetch error that may occur.
        console.log('Fetch error:', error); // this will log the error using console.error with the goal to help in the development process to refer to.
    });
}

                    // Render Current Weather:
// Create a function to extract and display the current weather data including city name, date, temperature, wind speed, humidity, and weather icon.


function renderCurrentWeather(weatherData) {
    // Extracting data from the weatherData object.
    const cityName = weatherData.name;
    const date = new Date(weatherData.dt * 1000).toLocaleDateString(); // Converts timestamp to date a string. .dt is a property in the API that contains a unix timestamp. Which represents dates and times as a single numeric value. * 1000 is because the API is doing seconds and JS 'data' object works with miliseconds.
    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const weatherIcon = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

    // Clears previous content in container div.
    container.innerHTML = '';

    // Creates elements to display weather information.
    const cityHeader = document.createElement('h2');
    cityHeader.textContent = `${cityName} (${date})`;

    const temperatureParagraph = document.createElement('p');
    temperatureParagraph.textContent = `Temperature: ${temperature} °F`;

    const windSpeedParagraph = document.createElement('p');
    windSpeedParagraph.textContent = `Wind Speed: ${windSpeed} MPH`;

    const humidityParagraph = document.createElement('p');
    humidityParagraph.textContent = `Humidity: ${humidity} %`;

    const iconImage = document.createElement('img');
    iconImage.setAttribute('src', iconUrl);
    iconImage.setAttribute('alt', weatherData.weather[0].description);

    // Appends the elements to the div called container.
    container.append(cityHeader, iconImage, temperatureParagraph, windSpeedParagraph, humidityParagraph);
}

                    // Render 5-Day Forecast:
// Create a function to extract and display the 5-day weather forecast data including date, temperature, wind speed, humidity, and weather icons.



                    // Store Search History:
// Create a function to store searched city names in localStorage.
// Ensure the search history is updated each time a new city is searched.



                    // Display Search History:
// Create a function to render search history buttons from the stored cities in localStorage.



                    // Handle Search History Clicks:
// Attach an event listener to the container holding the search history buttons.
// Ensure clicking on a search history button fetches and displays weather data for the corresponding city.



                    // Clear Previous Data:
// Ensure that each new search clears previous weather data before displaying new data.






























































// function getData() {
//     let city = searchInput.value.trim();
//     const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIK}`;
    
//     fetch(apiURL)
//     .then(function (response) {
//     return response.json();

//     })
//     .then(function (data) {
//         renderCurrentWeather(city,data);
//         storeSearchHistory(city);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });    
// }



// function renderCurrentWeather(city, weather){
    
//     const temp = weather.list[0].main.temp;
//     const wind = weather.list[0].wind.speed;
//     const humid = weather.list[0].main.humidity;
//     const icon = weather.list[0].weather[0].icon;
//     const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    
//     container.innerHTML = '';

//     const cityNameH1 = document.createElement('h1');
//     const dateH2 = document.createElement('h2');
//     const tempH1 = document.createElement('h1');
//     const windH1 = document.createElement('h1');
//     const humidH1 = document.createElement('h1');
//     const iconImg = document.createElement('img');
    
//     cityNameH1.textContent = city;
//     dateH2.textContent = date;
//     tempH1.textContent = temp;
//     windH1.textContent = wind;
//     humidH1.textContent = humid;
//     iconImg.setAttribute ('src', iconUrl);

//     container.append(cityNameH1, dateH2, tempH1, windH1, humidH1, iconImg);

//     createHistoryButton();
//     // renderForecast(weather);
// }

// function storeSearchHistory(city){
//     storedCities.push(city)
//     localStorage.setItem('cities', JSON.stringify(storedCities))
// }

// function createHistoryButton() {
//     const thisStoredCity = JSON.parse(localStorage.getItem("cities")) || [];
//     if(thisStoredCity) {
// for (let i = 0; i < thisStoredCity.length; i++) {
    
//     const newButton = document.createElement('button');
//     newButton.classList.add('historybtn')
//     newButton.textContent = thisStoredCity[i];
//     btnContainer.append(newButton);
//         }
//     }
// }

// function handleSearchHistory(e){
//     if(!e.target.matches('.historybtn')) {
//         return;
//     }
//     const target = e.target;
//     const cityName = target.textContent;
//     renderCurrentWeather(cityName);
// }



// createHistoryButton();
// btnContainer.addEventListener('click', handleSearchHistory);


// searchButton.addEventListener('click', getData);