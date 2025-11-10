const express = require('express');
const app = express();

const apiKey = '';

app.use(express.static("frontend/public"));

app.get("/api/weather", async (req, res) => {
    const locationQuery = req.query.location;
    const geoQuery = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationQuery}&limit=1&appid=${apiKey}`);

    if (!geoQuery.ok) {
        console.log(`HTTP ${geoQuery.status}: ${geoQuery.statusText}`);
    }
    const geoResponse = await geoQuery.json();

    if (!Array.isArray(geoResponse) || geoResponse.length === 0) {
        return res.status(404).json({error: 'No location found'});
    }

    const {lat, lon, name, state, country} = geoResponse[0];
    const displayName = [name, state, country].filter(Boolean).join(', ');

    const conditionsQuery = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${apiKey}`);
    const conditionsResponse = await conditionsQuery.json();

    if (!conditionsResponse.ok) {
        console.log(`HTTP ${conditionsResponse.status}: ${conditionsResponse.statusText}`);
    }

    res.json({
        location: displayName,
        coordinates: {lat, lon},
        conditions: conditionsResponse.current,
    });
});

app.listen(3000, () => console.log('App is listening on port 3000'));
