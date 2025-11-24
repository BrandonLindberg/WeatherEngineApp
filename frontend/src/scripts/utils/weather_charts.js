import Chart from 'chart.js/auto';

const todayIndex = new Date().getDay();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const orderedDays = [];

let rainGraph = document.getElementById('rainGraph');
let hourGraph = document.getElementById('forecastHourlyGraph');
let dayGraph = document.getElementById('forecastDailyGraph');

let rainChart;
let hourlyChart;
let dailyChart;

// export function assignCanvas() {
//     hourGraph = document.getElementById('forecastHourlyGraph');
//     dayGraph = document.getElementById('forecastDailyGraph');
// }

for (let i = 0; i < 7; i++) {
    const dayIndex = (todayIndex + i) % 7;
    orderedDays.push(daysOfWeek[dayIndex]);
}

// get data from API call
export function renderGraphs(data) {

    if (hourlyChart) {
        hourlyChart.destroy();
    }

    if (dailyChart) {
        dailyChart.destroy();
    }

    const hourlyArray = data?.hourly.slice(0, 12);
    const dailyTemps = data?.daily.slice(0, 7);

    console.log(data.hourly.weather);

    const hours = Array.from({length: 12}, (_, index) => index + 1);

    const hourlyTemps = hourlyArray.map(temps => temps.temp);

    // const hourlyRain = hourlyArray.map(amount => amount.rain[0]);

    const dailyTempMax = dailyTemps.map(dailyTemp => dailyTemp.temp.max);
    const dailyTempMin = dailyTemps.map(dailyTemps => dailyTemps.temp.min);

    // rainChart = new Chart( rainGraph, 
    //     {
    //         type: 'bar',
    //         data: {
    //             labels: hours,
    //             datasets: [{
    //                 data: hourlyRain,
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                 ],
    //                 borderColor: [
    //                     'rgba(255, 99, 132)',
    //                 ],
    //                 borderWidth: 1
    //             }]

    //         }
    // });

    hourlyChart = new Chart( hourGraph,
        {
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

    dailyChart = new Chart( dayGraph,
            {
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
}