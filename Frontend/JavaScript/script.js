document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent form from refreshing the page

            const variable = document.getElementById("search-input").value;

            if (!variable) {
                alert("Please enter a search query!");
                return;
            }

            // Send the variable to the backend
            try {
                const response = await fetch("/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({variable}), // Send the search term
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }

                const products = await response.json(); // Get product data from the backend
                console.log("Received products:", products);

                // Render the product list on the frontend
                renderProductList(products);
            } catch (error) {
                console.error("Error:", error);
                alert("Error fetching product data.");
            }
        });
    }

    // Render product list dynamically
    function renderProductList(products) {
        const productGrid = document.getElementById("productGrid");
        productGrid.innerHTML = ""; // Clear existing results

        if (products.length === 0) {
            productGrid.innerHTML = "<p>No products found.</p>";
            return;
        }

        // Dynamically insert product data into the grid
        products.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <a href="${product.link}" target="_blank">View Product</a>
            `;
            productGrid.appendChild(productItem);
        });
    }
});
