// script.js

// Mock Product List and Coupon Section Rendering
const renderProductList = () => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = `
        <h2>Product List</h2>
        <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
        </ul>
    `;
};

const renderCouponSection = () => {
    const couponSection = document.getElementById("coupon-section");
    couponSection.innerHTML = `
        <h2>Available Coupons</h2>
        <ul>
            <li>Coupon 1: 10% Off</li>
            <li>Coupon 2: Free Shipping</li>
        </ul>
    `;
};

// Handle Search Functionality
const handleSearch = async (query) => {
    if (!query) return alert("Please enter a search query!");

    try {
        const response = await fetch("/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query}),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Search Results:", data);
        // Update DOM with search results (if needed)
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};

document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    handleSearch(query);
});

// Handle File Upload
document.getElementById("upload-btn").addEventListener("click", async () => {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to process the file");

        const result = await response.json();
        console.log("Backend Response:", result);
    } catch (error) {
        console.error("Error:", error);
    }
});

// Render initial content
renderProductList();
renderCouponSection();
