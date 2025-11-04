const express = require('express');
const app = express();

const apiKey = '7452b20bcd78b372c5fd56d46266531e';

app.use(express.static("frontend/public"));

app.get("/api/geocode", async (query) => {

    try {
        const locationQuery = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`);
        const locationResult = await locationQuery.json();
        
    } catch(err) {
        response.status(500).json({error: "Failed to fetch location data"});
    }
    const {lat, lon} = locationResult[0];

    // getConditionsFromCoords(lat, lon);
});

async function getConditionsFromCoords(lat, lon) {
    try {
        const queryResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${apiKey}`);
        const conditionData = await queryResponse.json();
    } catch (err) {
        response.status(500).json({error: "Failed to fetch weather data"});
    }
}

app.listen(3000, () => console.log('App is listening on port 3000'));