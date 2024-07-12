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


                    // Render Current Weather:
// Create a function to extract and display the current weather data including city name, date, temperature, wind speed, humidity, and weather icon.



                    // Render 5-Day Forecast:
// Create a function to extract and display the 5-day weather forecast data including date, temperature, wind speed, humidity, and weather icons.



                    // Store Search History:
// Create a function to store searched city names in localStorage.




                    // Display Search History:
// Create a function to render search history buttons from the stored cities in localStorage.



                    // Handle Search History Clicks:
// Attach an event listener to the container holding the search history buttons.




                    // Clear Previous Data:































































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