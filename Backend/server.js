const express = require('express');
const app = express();
const PORT = 3000;
const dirname = "../"+__dirname
// Middleware to parse JSON
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(dirname + "index.html");
});

// Endpoint to receive the variable
app.post('/submit', (req, res) => {
    const { variable } = req.body; // Extract the variable from the request body
    console.log(`Received variable: ${variable}`); // Log it to the console
    res.sendStatus(200); // Send a success response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
