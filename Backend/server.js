const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const {getJson} = require("serpapi");

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

// Serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "HTML", "index.html"));
});

// Endpoint to receive the variable and query the API
app.post("/submit", (req, res) => {
    const {variable} = req.body;

    if (!variable) {
        return res.status(400).send("Variable is required");
    }

    getJson(
        {
            engine: "google_shopping",
            q: variable,
            api_key: process.env.SERPAPI_KEY,
            hl: "en",
            gl: "IN",
            currency: "INR",
            location: "Assam, India",
        },
        (json) => {
            if (!json || json.error) {
                return res
                    .status(500)
                    .json({error: "Error fetching data from the API."});
            }

            console.log("Shopping Results:", json);
            res.json(json); // Send the API results to the frontend
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
