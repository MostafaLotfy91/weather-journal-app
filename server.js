// all the server code till the line 22 is from the lesson 4. Web APIs and Asynchronous Applications
// i am not responsible for any copyright 

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
    /* Middleware*/
    //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server 
// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
};
// get route
app.get('/all', getData);
// Callback function to complete Post
function postData(req, res) {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
}

// Post Route
app.post('/add', postData);
// port declaration
const port = 1000;
// run the server and check terminal result 
const server = app.listen(port, listining);

function listining() {
    console.log(`server runing ${port}`);
}
// till here the server is runing on port localhost 5000 successefuly