const inputField = document.getElementById('searchBox');
const autofillContainer = document.getElementById('autofillBox');
const button = document.getElementById('searchButton');

let inputString = '';
let selectedArray = [];

let timeout;

inputField.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(fetchSuggestions, 100);
});

inputField.addEventListener("change", () => {
    inputString = selectedArray[0];
});

function fetchSuggestions(){
    inputString = inputField.value;

    autofillContainer.innerHTML = '';

    if(inputString !== ''){
        fetch(`http://localhost:3000/api/location?location=${inputString}`)
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
            count++;
        }
    });
    selectedArray.push(arrayHolder[1]);
    selectedArray.push(arrayHolder[2]);
    console.log(selectedArray[0]);
}

function checkStrings() {
    const preFormattedString = `lat=${(selectedArray[0])}&lon=${(selectedArray[1])}`;
    const formattedString = encodeURIComponent(preFormattedString);

    fetch (`http://localhost:3000/api/weather?q=${formattedString}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.dispatchEvent(new CustomEvent('weatherDataReady', {detail: data}));
        });
}

button.addEventListener("click", () => {
    checkStrings();
});
