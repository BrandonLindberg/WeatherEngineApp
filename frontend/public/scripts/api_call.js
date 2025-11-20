// window.onload = function callAPI() {
//     const inputQuery = new URLSearchParams(window.location.search).get('q');

//     console.log(inputQuery);

//     fetch(`http://localhost:3000/api/weather?q=${inputQuery}`)
//         .then(res => res.json())
//         .then(data => {
//             window.weatherData = data;
//             document.dispatchEvent(new CustomEvent('weatherDataReady', {detail: data}));
//         });
// }