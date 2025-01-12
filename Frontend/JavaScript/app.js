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
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

// Filter products based on search and filters
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    return products.filter((product) => {
        // Search filter
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);

        // Category filter
        const matchesCategory = !category || product.category === category;

        // Price filter
        let matchesPrice = true;
        if (priceRange) {
            const [min, max] = priceRange.split("-").map(Number);
            if (max) {
                matchesPrice = product.price >= min && product.price <= max;
            } else {
                matchesPrice = product.price >= min;
            }
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${
        product.title
    }" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-store">${product.store}</p>
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

// Event listeners
searchInput.addEventListener("input", searchProducts);
categoryFilter.addEventListener("change", searchProducts);
priceFilter.addEventListener("change", searchProducts);

// Initial display
displayProducts(products);
