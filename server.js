const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(express.static("frontend/public"));
app.use(cors());

const geoKey = process.env.MAPBOX_DEV_KEY;
const apiKey = process.env.OPENWEATHER_API_KEY;

app.get("/api/weather", async (req, res) => {
    const locationQuery = req.query.q;
    const decoded = decodeURIComponent(locationQuery);
    console.log(decoded);
    // const geoQuery = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationQuery}&limit=1&appid=${apiKey}`);

    // if (!geoQuery.ok) {
    //     console.log(`HTTP ${geoQuery.status}: ${geoQuery.statusText}`);
    // }
    // const geoResponse = await geoQuery.json();

    // if (!Array.isArray(geoResponse) || geoResponse.length === 0) {
    //     return res.status(404).json({error: 'No location found'});
    // }

    // const {lat, lon, name, state, country} = geoResponse[0];
    // const displayName = [name, state, country].filter(Boolean).join(', ');

    const conditionsQuery = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${decoded}&units=imperial&exclude=minutely,alerts&appid=${apiKey}`);
    const conditionsResponse = await conditionsQuery.json();

    res.json({
        // location: displayName,
        // coordinates: {lat, lon},
        conditions: conditionsResponse.current,
        hourly: conditionsResponse.hourly,
        daily: conditionsResponse.daily,
    });
});

app.get("/api/location", async (req, res) => {
    const inputQuery = req.query.location;

    const geoQuery = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${inputQuery}&access_token=${geoKey}`);
    const geoResult = await geoQuery.json();

    res.json({
        geoResult,
    });
});

app.listen(3000, () => console.log('App is listening on port 3000'));
