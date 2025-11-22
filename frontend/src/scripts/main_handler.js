// import { createRoot } from "react-dom/client";
import { updateVersion } from "./version_checker.js";
import { renderConditions } from "./render_conditions.js";
import { renderGraphs } from "./weather_charts.js";

const autofillContainer = document.getElementById('autofillBox');
const inputField = document.getElementById('searchBox');
const button = document.getElementById('searchButton');

let inputString = '';
let locationArray = [];
let locationName;

let timeout;
let count;

let canEnter = true;

// const root = createRoot(document.getElementById('root'));

inputField.addEventListener("input", () => {
    clearTimeout(timeout);
    if (inputField.value !== '') {
        timeout = setTimeout(dataQuery, 100);
    }
});

inputField.addEventListener("change", () => {
    inputString = locationArray[0];
});

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && canEnter === true && inputField === document.activeElement) {
        button.click();
    }
});

button.addEventListener("click", () => {
    if (inputField.value !== '') {
        fetchLocationQuery();
    }
});


function dataQuery() {
    canEnter = false;
    inputString = inputField.value;
    fetchLocationMatches(inputString);
}

// fetch matches for current input
async function fetchLocationMatches(query) {
    locationArray = [];
    const fetchQuery = await fetch(`http://localhost:4173/api/location?location=${query}`);
    const fetchResult = await fetchQuery.json();
    normalizeArray(fetchResult);
}

// loop over each match returned and insert them into datelist; set location array to closest match
function normalizeArray(raw) {

    autofillContainer.innerHTML = '';
    count = 0;

    raw.features.forEach(f => {
        const name = f.properties.full_address ?? 'Unknown';
        const lat = f.properties.coordinates.latitude ?? 'none';
        const lon = f.properties.coordinates.longitude ?? 'none';
        autofillContainer.innerHTML += `<option value="${name}"></option>`;
        
        if (count == 0) {
            locationArray.push(name, lat, lon);
            locationName = name; // fix this
        }
        count++;
    });
    canEnter = true;
}

// get coords of current location match and send them to the server
function fetchLocationQuery() {
    const unencodedQuery = `lat=${(locationArray[1])}&lon=${(locationArray[2])}`;
    const encodedQuery = encodeURIComponent(unencodedQuery);

    fetch (`http://localhost:4173/api/weather?q=${encodedQuery}`)
        .then(res => res.json())
        .then(data => {
            callRenderers(data);
    });
}

function callRenderers(data) {
    renderConditions(data, locationName);
    renderGraphs(data);
}
updateVersion();