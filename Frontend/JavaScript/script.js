// Wait until the DOM is fully loaded to ensure elements are available
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent form from refreshing the page

            const variable = document.getElementById("search-input").value;

            // Send the variable to the backend
            await fetch("/submit", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({variable}),
            });

            alert("Variable sent to the backend!");
        });
    }

    // Handle Search Functionality
    document.getElementById("search-btn").addEventListener("click", () => {
        const query = document.getElementById("search-input").value;
        if (query) {
            alert(`Searching for: ${query}`);
        } else {
            alert("Please enter a search query!");
        }
    });

    // Handle File Upload
    document
        .getElementById("upload-btn")
        .addEventListener("click", async () => {
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
});

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
