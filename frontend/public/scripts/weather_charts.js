const todayIndex = new Date().getDay();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const orderedDays = [];

const hourGraph = document.getElementById('forecastHourlyGraph');
const dayGraph = document.getElementById('forecastDailyGraph');

const hourlyTempArray = [];
const dailyTemps = [];

const hours = [];
const hourlyTemps = [];

const dailyTempMax = [];
const dailyTempMin = [];

const hourlyChart = new Chart({
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            data: hourlyTemps,
            fill: false,
            borderColor: 'rgb(235, 196, 0)',
            tension: .5
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours from current'
                }
            }
        }
    }
});

const dailyChart = new Chart({
    type: 'line',
    data: {
        labels: orderedDays,
        datasets: [{
            label: 'Max',
            data: dailyTempMax,
            fill: false,
            borderColor: 'rgb(255, 136, 0)',
            tension: .2
        },
        {
            label: 'Min',
            data: dailyTempMin,
            fill: false,
            borderColor: 'rgb(0, 93, 255)',
            tension: .2
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    boxWidth: 15,
                    boxHeight: 1
                }
            }
        }
    }
});

for (let i = 0; i < 7; i++) {
    const dayIndex = (todayIndex + i) % 7;
    orderedDays.push(daysOfWeek[dayIndex]);
}

// get data from API call
document.addEventListener("weatherDataReady", (event) => {
    const data = event.detail;
    renderForecastGraph(data)
});

// render the weather charts
function renderForecastGraph(data) {
    hourlyTempArray = data?.hourly.slice(0, 12);
    dailyTemps = data?.daily.slice(0, 7);

    hours = Array.from({length: 12}, (_, index) => index + 1);
    hourlyTemps = hourlyTempArray.map(temps => temps.temp);

    dailyTempMax = dailyTemps.map(dailyTemp => dailyTemp.temp.max);
    dailyTempMin = dailyTemps.map(dailyTemps => dailyTemps.temp.min);

    hourlyChart.update();
    dailyChart.update();
}