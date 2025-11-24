const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(express.static("../frontend/dist"));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline';");
    next();
})

const geoKey = process.env.MAPBOX_DEV_KEY;
const apiKey = process.env.OPENWEATHER_API_KEY;

app.get("/api/weather", async (req, res) => {
    const locationQuery = req.query.q;
    const decoded = decodeURIComponent(locationQuery);

    const conditionsQuery = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${decoded}&units=imperial&exclude=minutely,alerts&appid=${apiKey}`);
    const conditionsResponse = await conditionsQuery.json();

    res.json({
        conditions: conditionsResponse.current,
        hourly: conditionsResponse.hourly,
        daily: conditionsResponse.daily,
    });
});

app.get("/api/location", async (req, res) => {
    const inputQuery = req.query.location;
    const gQuery = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${inputQuery}&access_token=${geoKey}`);
    const gResult = await gQuery.json();

    res.json(gResult);
});

app.listen(3000, () => console.log('App is active on port 3000'));
