// import { createRoot } from "react-dom/client";
import { updateVersion } from "./version_checker.js";
import { renderConditions } from "./render_conditions.js";
import { renderGraphs } from "./weather_charts.js";

const inputField = document.getElementById('searchBox');
const autofillContainer = document.getElementById('autofillBox');
const button = document.getElementById('searchButton');

let inputString = '';
let selectedArray = [];

let locationName;

let timer1;
let timer2;

// const root = createRoot(document.getElementById('app'));

inputField.addEventListener("input", () => {
    autofillContainer.innerHTML = '';
    clearTimeout(timer1);
    timer1 = setTimeout(fetchSuggestions, 50);
});

inputField.addEventListener("change", () => {
    inputString = selectedArray[0];
});

function fetchSuggestions(){
    inputString = inputField.value;
    autofillContainer.innerHTML = '';
    if(inputString !== ''){
        fetch(`https://weather.snailroom.net/api/location?location=${inputString}`)
            .then(res => res.json())
            .then(data => {
                updateAutofill(data);
        });
    }
}

function updateAutofill(data) {

    let count = 0;
    let arrayHolder = [];

    selectedArray = [];

    data.geoResult.features.forEach(feature => {
        const name = [feature.properties.full_address];
        const lat = [feature.properties.coordinates.latitude];
        const lon = [feature.properties.coordinates.longitude];
        autofillContainer.innerHTML += `<option value="${name}"></option>`;

        if (count == 0) {
            arrayHolder.push(name);
            arrayHolder.push(lat);
            arrayHolder.push(lon);
            locationName = name;
            count++;
        }
    });
    selectedArray.push(arrayHolder[1]);
    selectedArray.push(arrayHolder[2]);
}

function checkStrings() {
    const preFormattedString = `lat=${(selectedArray[0])}&lon=${(selectedArray[1])}`;
    const formattedString = encodeURIComponent(preFormattedString);

    fetch (`https://weather.snailroom.net/api/weather?q=${formattedString}`)
        .then(res => res.json())
        .then(data => {
            document.dispatchEvent(new CustomEvent('weatherDataReady', {detail: data}));
            console.log(data)
        });
}

document.addEventListener("weatherDataReady", (event) => {
    const data = event.detail;
    renderConditions(data, locationName);
    renderGraphs(data);
});

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && inputField.value !== '') {
        if (inputField === document.activeElement) {
            clearTimeout(timer2);
            timer2 = setTimeout(button.click(), 50);
        }
    }
});

button.addEventListener("click", () => {
    if (inputField.value !== '') {
        checkStrings();
    }
});

updateVersion();