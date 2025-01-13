const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const {getJson} = require("serpapi");

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));


// Endpoint to handle the search and Google Shopping API call
app.post('/submit', async (req, res) => {
    const { variable } = req.body; // Get the search query from the frontend

    if (!variable) {
        return res.status(400).send('Variable is required');
    }

    // Call Google Shopping API to get product data
    try {
        const result = await getJson({
            engine: "google_shopping",
            q: variable, // Use the search query sent from the frontend
            api_key: process.env.SERPAPI_KEY,
        });

        if (result && result.shopping_results) {
            return res.json(result.shopping_results); // Send the products data to frontend
        } else {
            return res.status(404).send('No products found');
        }
    } catch (error) {
        console.error('Error fetching data from Google Shopping API:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "HTML", "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
