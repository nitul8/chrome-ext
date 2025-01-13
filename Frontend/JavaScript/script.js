// Sample product data (in a real app, this would come from an API)
const products = [
    {
        id: 1,
        title: "Summer Dress",
        price: 49.99,
        store: "Fashion Store A",
        category: "clothing",
        image: "https://picsum.photos/300/400",
    },
    {
        id: 2,
        title: "Running Shoes",
        price: 89.99,
        store: "Fashion Store B",
        category: "shoes",
        image: "https://picsum.photos/300/400",
    },
    {
        id: 3,
        title: "Designer Handbag",
        price: 129.99,
        store: "Fashion Store C",
        category: "accessories",
        image: "https://picsum.photos/300/400",
    },
];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("search-input");
const priceFilter = document.getElementById("priceFilter");

// Filter products based on search and filters
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const priceRange = priceFilter.value;

    return products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        let matchesPrice = true;

        if (priceRange) {
            const [min, max] = priceRange.split("-").map(Number);
            matchesPrice = max
                ? product.price >= min && product.price <= max
                : product.price >= min;
        }

        return matchesSearch && matchesPrice;
    });
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${
        product.title
    }" class="product-image">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
                <p class="product-store">${product.store}</p>
                <button class="buy-now-button" aria-label="Buy Now for ${
                    product.title
                }">Buy Now</button>
            </div>
        </div>
    `;
}

// Display products in the grid
function displayProducts(filteredProducts) {
    productGrid.innerHTML = filteredProducts.map(createProductCard).join("");
}

// Search products
function searchProducts() {
    const filteredProducts = filterProducts();
    displayProducts(filteredProducts);
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
    displayProducts(products);

    searchInput.addEventListener("input", searchProducts);
    priceFilter.addEventListener("change", searchProducts);

    const form = document.getElementById("myForm");
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const variable = searchInput.value;

            try {
                const response = await fetch("/submit", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({variable}),
                });
                alert(
                    response.ok
                        ? "Variable sent to the backend!"
                        : "Error sending variable to the backend."
                );
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    const uploadButton = document.getElementById("upload-btn");
    if (uploadButton && document.getElementById("file-input")) {
        uploadButton.addEventListener("click", async () => {
            const fileInput = document.getElementById("file-input");
            const file = fileInput.files[0];

            if (!file) {
                alert("Please select a file!");
                return;
            }

            if (
                file.size > 5 * 1024 * 1024 ||
                !["image/jpeg", "image/png", "application/pdf"].includes(
                    file.type
                )
            ) {
                alert("Invalid file. Please upload a valid file.");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Backend Response:", result);
                } else {
                    alert("Failed to upload the file.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});
