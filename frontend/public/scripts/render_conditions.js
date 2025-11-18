const conditionBox = document.querySelector('#conditionsTab')

document.addEventListener("weatherDataReady", (event) => {
    const data = event.detail;
    renderConditions(data);
});

function renderConditions(data) {
    const conditionBox = document.querySelector('#conditionsTab')

    conditionBox.innerHTML = `<div id="conditionDetails">
                        <h3>${data.conditions.weather[0].description}</h3>
                    </div>
                    <div id="tempDetails">
                        <h4>Temperature: ${Math.round(data.conditions.temp)}&#x2109</h4>
                        <h4>Feels Like: ${Math.round(data.conditions.feels_like)}&#x2109</h4>
                    </div>
                    <div id="humidityDetails">
                        <h4>Humidity: ${Math.round(data.conditions.humidity)}%</h4>
                        <h4>Dew Point: ${Math.round(data.conditions.dew_point)}&#x2109</h4>
                    </div>
                    <div id="windDetails">
                        <h4>Wind Speed: ${Math.round(data.conditions.wind_speed)} mph</h4>
                        <h4>Wind Direction: ${data.conditions.wind_deg}</h4>
                    </div>`
}