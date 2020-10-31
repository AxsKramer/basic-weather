const container = document.querySelector('#container');
const resultError = document.querySelector('#resultError');
const result = document.querySelector('#result');
const form = document.querySelector('#form');
const kelvinToCelsius = grades => parseInt(grades - 273.15);

form.addEventListener('submit', getWeather);

function getWeather(event){
    event.preventDefault();
    const city = document.querySelector('#city').value;
    const country = document.querySelector('#country').value;

    if(city === '' || country === ''){
        showError('Both field are required');
        return;
    }
    getData(city, country);
}

async function getData(city, country) {
    const appId = 'd4ded8a5e600be7f7b4755f520cdbd89';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
    Spinner(); 
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    cleanHtml();
    if(data.cod === "404") {
        showError('City not found')
        return;
    }
    showWeather(data);
}

function showWeather(data){
    const {name, coord: {lat, lon}, main: {temp, temp_max, temp_min, pressure, humidity}, weather } = data;

    const celsius = kelvinToCelsius(temp);
    const maxTemp = kelvinToCelsius(temp_max);
    const minTemp = kelvinToCelsius(temp_min);
    const city = document.createElement('p');
    city.textContent = name;
    city.className = 'font-weight-bold, cityWeather';

    const currentTemp = document.createElement('p');
    currentTemp.className = 'currentTemp';
    currentTemp.innerHTML= `${celsius} &#8451`;

    const currentStatus = document.createElement('p');
    currentStatus.innerHTML = `Current Status: ${weather[0].description}`;

    const maxMin = document.createElement('p');
    maxMin.innerHTML = `Maximum: ${maxTemp} &#8451 / Minimum: ${minTemp} &#8451`;

    const latlong = document.createElement('p');
    latlong.textContent = `Latitude: ${lat} / Longitude: ${lon}`;

    const humidityP = document.createElement('p');
    humidityP.textContent = `Humidity: ${humidity}%`;

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center', 'text-white', 'col-12');
    resultDiv.appendChild(city);
    resultDiv.appendChild(currentTemp);
    resultDiv.appendChild(maxMin);
    resultDiv.appendChild(currentStatus);
    resultDiv.appendChild(latlong);
    resultDiv.appendChild(humidityP);
    result.appendChild(resultDiv);
    console.log(weather[0])
    form.reset();
}





function showError(message){
    const alertDanger = document.querySelector('.alert-danger');

    if(!alertDanger){
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-danger', 'text-center', 'py-2', 'mb-3', 'mt-3');
        alert.innerHTML = `
            <strong>Error!</strong> <span>${message}</span>
        `;
        resultError.appendChild(alert);
        setTimeout(() => alert.remove() ,3500);
    }
}

function cleanHtml(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function Spinner() {
    cleanHtml();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    result.appendChild(divSpinner);
}