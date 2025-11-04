window.onload = function callAPI() {
    const inputQuery = new URLSearchParams(window.location.search).get('locationQuery');
    const formattedQuery = encodeURIComponent(inputQuery.trim());

    const url = fetch('https://localhost:3000/api/geocode', (formattedQuery));

    console.log(formattedQuery);
}