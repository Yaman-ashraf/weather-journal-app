// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8088;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Callback function to complete GET '/all'
const getData = (req, res) => {
    res.send(projectData);
};

// Post Route
app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    };
    res.send(projectData);
});
