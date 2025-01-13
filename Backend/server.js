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

            // Assuming json.shopping_results contains the array of products
            const products = json.shopping_results || [];

            // Filter out products with null prices or ratings
            const filteredProducts = products.filter(
                (product) => product.price !== null && product.rating !== null
            );

            // Sort by rating (high to low), then by price (low to high)
            const sortedProducts = filteredProducts
                .sort((a, b) => {
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating; // Higher ratings first
                    }
                    return a.price - b.price; // Lower prices first
                })
                .slice(0, 10); // Limit to top 10 results

            // Map to extract only the required fields
            const outputProducts = sortedProducts.map((product) => ({
                position: product.position,
                title: product.title,
                link: product.link,
                product_link: product.product_link,
                comparison_link: product.comparison_link,
                source: product.source,
                price: product.price,
                rating: product.rating,
                thumbnail: product.thumbnail,
            }));

            console.log("Top Sorted Shopping Results:", outputProducts); // Print sorted results to console

            // Send sorted results back to the frontend
            res.json(outputProducts);
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
