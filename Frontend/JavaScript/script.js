// Handle Search Bar
document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value;

    if (!query) {
        alert("Please enter a search query!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query}),
        });

        if (!response.ok) throw new Error("Failed to fetch search results");

        const data = await response.json();
        updateProductList(data.products);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
});

// Update Product List
function updateProductList(products) {
    const productList = document.getElementById("product-items");
    productList.innerHTML = "";

    if (!products || products.length === 0) {
        productList.innerHTML = "<li>No products found!</li>";
        return;
    }

    products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.textContent = product.name;
        productList.appendChild(listItem);
    });
}

// Load Coupons
async function loadCoupons() {
    try {
        const response = await fetch("http://localhost:5000/coupons");

        if (!response.ok) throw new Error("Failed to fetch coupons");

        const data = await response.json();
        const couponSection = document.getElementById("coupon-items");

        data.coupons.forEach((coupon) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${coupon.code} - ${coupon.discount}% off`;
            couponSection.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading coupons:", error);
    }
}

// Initialize Page
document.addEventListener("DOMContentLoaded", loadCoupons);
