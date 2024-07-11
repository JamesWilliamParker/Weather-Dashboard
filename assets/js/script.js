const API = '5839972b293a2bb4a4def3084d9f3d38';
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

function getData() {
    let city = searchInput.value.trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;

    fetch(apiURL)
    .then(function (response) {
    return response.json();

    })
    .then(function (data) {
        renderCurrentWeather(city,data);
    })
    .catch(function (error) {
        console.log(error);
    });    
}



function renderCurrentWeather(city,weather){
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humidity = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    
    // console.log(iconURL);
    // console.log(weather.list[0].wind.speed);
}

searchButton.addEventListener('click', getData);

