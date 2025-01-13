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
                    body: JSON.stringify({ variable }), // Send the search term
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
                <img src="${product.image}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <a href="${product.link}" target="_blank">View Product</a>
            `;
            productGrid.appendChild(productItem);
        });
    }
});




/*document.getElementById("find-similar-btn").addEventListener("click", async () => {
    // Automatically fetch the image URL (you can update this selector as needed)
    const productImage = document.querySelector(".product-list img");
    if (!productImage) {
        alert("No product image found to analyze!");
        return;
    }

    const imageUrl = productImage.src;

    // Use Google Shopping API for the image query
    try {
        const response = await fetch(`https://serpapi.com/search.json?engine=google_products&image_url=${encodeURIComponent(imageUrl)}&api_key=YOUR_SERPAPI_KEY`);
        if (!response.ok) throw new Error("Failed to fetch related products");

        const data = await response.json();
        displayRelatedProducts(data);
    } catch (error) {
        console.error("Error fetching related products:", error);
        alert("Failed to fetch related products. Please try again.");
    }
});

// Function to display related products
function displayRelatedProducts(data) {
    const relatedProductsDiv = document.getElementById("related-products");
    relatedProductsDiv.innerHTML = "<h3>Related Products:</h3>";

    if (!data.shopping_results || data.shopping_results.length === 0) {
        relatedProductsDiv.innerHTML += "<p>No related products found.</p>";
        return;
    }

    data.shopping_results.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("related-product");
        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" style="width: 100px;" />
            <p>${product.title}</p>
            <p>Price: ${product.price || "N/A"}</p>
            <a href="${product.link}" target="_blank">View Product</a>
        `;
        relatedProductsDiv.appendChild(productElement);
    });
}
*/