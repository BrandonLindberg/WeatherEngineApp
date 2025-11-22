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
let count;

let canEnter = true;

// const root = createRoot(document.getElementById('root'));

inputField.addEventListener("input", () => {
    autofillContainer.innerHTML = '';
    dataQuery();
});

inputField.addEventListener("change", () => {
    inputString = selectedArray[0];
});

function dataQuery() {
    inputString = inputField.value;
    if(inputString !== ''){
        fetchSuggestions(inputString);
        canEnter = false;
    }
    autofillContainer.innerHTML = '';
}

function checkStrings() {
    const preFormattedString = `lat=${(selectedArray[0])}&lon=${(selectedArray[1])}`;
    const formattedString = encodeURIComponent(preFormattedString);

    fetch (`http://localhost:5173/api/weather?q=${formattedString}`)
        .then(res => res.json())
        .then(data => {
            sendData(data);
    });
}

function sendData(data) {
    renderConditions(data, locationName);
    renderGraphs(data);
}

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && canEnter === true) {
        if (inputField === document.activeElement) {
            button.click();
        }
    }
});

button.addEventListener("click", () => {
    if (inputField.value !== '') {
        checkStrings();
    }
});

async function fetchSuggestions(inputString) {
    selectedArray = [];
    const fetchQuery = await fetch(`http://localhost:5173/api/location?location=${inputString}`)
    const fetchResult = await fetchQuery.json()

    normalizeArray(fetchResult);
}

function normalizeArray(raw) {

    let matchedArray = [];

    count = 0;

    raw.features.forEach(f => {
        const name = f.properties.full_address ?? 'Unknown';
        const lat = f.properties.coordinates.latitude ?? 'none';
        const lon = f.properties.coordinates.longitude ?? 'none';
        autofillContainer.innerHTML += `<option value="${name}"></option>`;
        
        if (count == 0) {
            matchedArray.push(name, lat, lon);
            console.log(matchedArray)
            selectedArray = matchedArray.map(item => {
                return;
            });
            // selectedArray.push(matchedArray[1]);
            // selectedArray.push(matchedArray[2]);
            console.log(selectedArray);
            locationName = name;
            count++;
        }
    });
    canEnter = true;
}
updateVersion();