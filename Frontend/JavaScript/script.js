// Sample product data (in a real app, this would come from an API)
const pr = res.json(outputProducts);
// const products = [
//     {
//         id: 1,
//         title: "Summer Dress",
//         price: 49.99,
//         store: "Fashion Store A",
//         category: "clothing",
//         image: "https://picsum.photos/300/400",
//     },
//     {
//         id: 2,
//         title: "Running Shoes",
//         price: 89.99,
//         store: "Fashion Store B",
//         category: "shoes",
//         image: "https://picsum.photos/300/400",
//     },
//     {
//         id: 3,
//         title: "Designer Handbag",
//         price: 129.99,
//         store: "Fashion Store C",
//         category: "accessories",
//         image: "https://picsum.photos/300/400",
//     },
// ];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("search-input");
const priceDropdown = document.getElementById("priceDropdown");

// Filter products based on search and filters
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const priceRange = priceDropdown
        .querySelector(".selected")
        ?.getAttribute("data-value");

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
function createProductCard() {
    return `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${pr.thumbnail}" alt="${
        pr.title
    }" class="product-image">
            </div>
            <div class="product-details">
                <h3 class="product-title">${pr.title}</h3>
                <p class="product-price">₹${pr.price.toFixed(2)}</p>
                <p class="product-store">${pr.source}</p>
                <button class="buy-now-button" aria-label="Buy Now for ${
                    pr.link
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

    // Handle dropdown toggle
    document.querySelector(".dropbtn").addEventListener("click", function () {
        document.getElementById("priceDropdown").classList.toggle("show");
    });

    // Close dropdown if clicked outside
    window.onclick = function (event) {
        if (!event.target.matches(".dropbtn")) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show");
                }
            }
        }
    };

    // Handle filter selection
    const filterLinks = document.querySelectorAll(".dropdown-content a");
    filterLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Remove 'selected' class from all links and add to the clicked one
            filterLinks.forEach((link) => link.classList.remove("selected"));
            this.classList.add("selected");

            // Update the displayed products based on selected filter
            searchProducts();

            // Close dropdown after selection
            document.getElementById("priceDropdown").classList.remove("show");
        });
    });

    // Handle form submission
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

    // Handle file upload button click
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
