const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const {getJson} = require("serpapi");

const app = express();
const PORT = process.env.PORT || 5173; // Default to 5173 for local development

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend"))); // Serve static files from frontend folder

// Serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "HTML", "index.html")); // Ensure correct path to index.html
});

// Endpoint to receive the variable and query the API
app.post("/submit", (req, res) => {
    const {variable} = req.body; // Extract the variable from the request body

    if (!variable) {
        return res.status(400).send("Variable is required");
    }

    // Query the API using the extracted variable
    getJson(
        {
            engine: "google_shopping", // Specify the shopping engine
            q: variable, // Use the variable as the query term
            api_key: process.env.SERPAPI_KEY, // Your API key
            hl: "en", // Language (English)
            gl: "IN", // Geographic location (India)
            currency: "INR", // Set currency to Indian Rupees
            location: "Assam, India", // Specific location
        },
        (json) => {
            console.log("Shopping Results:", json); // Log the shopping results to the console
            res.json(json); // Send the response back to the client
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
