This project is a Chrome extension named "Alstylist" that helps users find fashion products that are pocket-friendly. It consists of a frontend and a backend, with the following key components:

## Frontend

**HTML**: The main HTML file index.html contains the structure of the extension's popup interface.
**CSS**: The stylesheet style.css defines the styles for the extension's UI.
**JavaScript**:
**app.js** handles product filtering and display logic.
**script.js** manages form submission, search functionality, and file upload.

## Backend

**Server**: The backend server server.js is built with Express.js. It serves the frontend files and handles API requests.
**Environment Variables**: The .env file contains environment variables, including the API key for SerpAPI and the server port.

## Manifest

**Manifest File**: The manifest.json file defines the extension's metadata, including its name, version, description, and permissions.

## Package Management

**Dependencies**: The package.json file lists the project's dependencies, including Express, dotenv, nodemon, and SerpAPI.

## Usage

**Start the Server**: Run npm start to start the backend server.
**Extension**: Load the extension in Chrome by pointing to the project directory.

This project integrates a frontend interface for searching and filtering fashion products with a backend server that queries the SerpAPI for product data.
