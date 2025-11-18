window.onload = function callAPI() {
    const inputQuery = new URLSearchParams(window.location.search).get('locationQuery');
    const formattedQuery = encodeURIComponent(inputQuery.trim());

    fetch(`http://localhost:3000/api/weather?location=${formattedQuery}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.weatherData = data;
            document.dispatchEvent(new CustomEvent('weatherDataReady', {detail: data}));
        });
}