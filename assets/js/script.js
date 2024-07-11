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
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    
    const container = document.getElementById('container');
    const tempH1 = document.createElement('h1');
    const windH1 = document.createElement('h1');
    const humidH1 = document.createElement('h1');
    const iconImg = document.createElement('img');
    // console.log(iconURL);
    // console.log(iconURL);
    // console.log(weather.list[0].wind.speed);

    tempH1.textContent = temp;
    windH1.textContent = wind;
    humidH1.textContent = humid;
    iconImg.setAttribute ('src', iconUrl);

    container.append(tempH1, windH1, humidH1, iconImg);
}

searchButton.addEventListener('click', getData);

