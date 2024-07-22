// Personal API Key for OpenWeatherMap API
const apiKey = '43221dfeab9fad734d2721369b9ca06c&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;


    getWeather(baseUrl, apiKey)
        .then(data => {
            // Add data to POST request
            postData('/add', { date: newDate, temp: data.main.temp, content: feelings })
                .then(() => {
                    // Call retrieveData to update browser content
                    retrieveData();
                });
        })
        .catch(error => console.log('Error:', error));
}

/* Function to GET Web API Data */
const getWeather = async (baseUrl, apiKey) => {
    const res = await fetch(baseUrl + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}°C`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.content}`;
    } catch (error) {
        console.log("error", error);
    }
}