const express = require('express');
const path = require('path');
const dotenv = require("dotenv").config();
const { getJson } = require("serpapi");

const app = express();
const PORT = process.env.PORT;
const parentDir = path.dirname(__dirname);

// Middleware to parse JSON
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(parentDir + "/Frontend/HTML/index.html");
});

// Endpoint to receive the variable and query the API
app.post('/submit', (req, res) => {
    const { variable } = req.body; // Extract the variable from the request body

    if (!variable) {
        return res.status(400).send('Variable is required');
    }

    // Query the API using the extracted variable
    getJson({
        engine: "google_shopping",
        q: variable, // Use the variable as the query for the API
        api_key: process.env.SERPAPI_KEY
    }, (json) => {
        console.log(json["shopping_results"]); // Log the shopping results
        res.json(json); // Send the response back to the client
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
