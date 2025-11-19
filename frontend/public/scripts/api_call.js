window.onload = function callAPI() {
    const inputQuery = new URLSearchParams(window.location.search).get('locationQuery');
    const formattedQuery = encodeURIComponent(inputQuery.trim());

    fetch(`https://weather.snailroom.net/api/weather?location=${formattedQuery}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.weatherData = data;
            document.dispatchEvent(new CustomEvent('weatherDataReady', {detail: data}));
        });
}