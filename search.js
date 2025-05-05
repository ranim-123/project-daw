// Product database - this would normally come from a backend API
const products = [
    {
        id: 1,
        name: "Air Huarache RUN",
        category: "shoes",
        price: 99.99,
        image: "image-daw/shoes5.png",
        description: "Collection 2023 (nouvelle arrivage)"
    },
    {
        id: 2,
        name: "NIKE AIR ZOOM",
        category: "shoes",
        price: 149.99,
        image: "image-daw/shoes3.png",
        description: "Dark blue shoes"
    },
    {
        id: 3,
        name: "NIKE FREE RUNNING",
        category: "shoes",
        price: 74.99,
        image: "image-daw/shoes6.png",
        description: "White yellow shoes"
    },
    {
        id: 4,
        name: "NIKE ZOOM KOBE IX 9",
        category: "shoes",
        price: 199.99,
        image: "image-daw/shoes1.png",
        description: "Black yellow shoes"
    },
    {
        id: 5,
        name: "t-shirt slim",
        category: "clothing",
        price: 14.99,
        image: "image-daw/t-shirt1-removebg-preview.png",
        description: "Nouvelle collection slim fit"
    },
    {
        id: 6,
        name: "black slim t-shirt",
        category: "clothing",
        price: 15.99,
        image: "image-daw/t-shirt2-removebg-preview.png",
        description: "Nouvelle collection slim fit (arrivage 2022)"
    },
    {
        id: 7,
        name: "sport t-shirt (black)",
        category: "clothing",
        price: 19.99,
        image: "image-daw/t-shirt3-removebg-preview.png",
        description: "Simple black t-shirt"
    },
    {
        id: 8,
        name: "RED T-SHIRT (slim fit)",
        category: "clothing",
        price: 24.99,
        image: "image-daw/t-shirt4-removebg-preview.png",
        description: "Nouveau design of t-shirt (2024)"
    },
    {
        id: 9,
        name: "gris DRESS (classic)",
        category: "dress",
        price: 199.99,
        image: "image-daw/dresse1-removebg-preview.png",
        description: "The best DRESS in the season 2023 - 2024"
    },
    {
        id: 10,
        name: "pransees dress (slim fit)",
        category: "dress",
        price: 299.99,
        image: "image-daw/dresse2-removebg-preview.png",
        description: "DREESS slim fit (arrivage 2022)"
    },
    {
        id: 11,
        name: "RED DRESS (slim fit)",
        category: "dress",
        price: 399.99,
        image: "image-daw/dresse3-removebg-preview.png",
        description: "The Beautiful DRESS in the year 2025"
    },
    {
        id: 12,
        name: "black DRESS (classic)",
        category: "dress",
        price: 499.99,
        image: "image-daw/dresse4-removebg-preview.png",
        description: "DRESS in the WEDDINGS"
    }
];

// Initialize search functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm.length > 0) {
                // Save search term to session storage
                sessionStorage.setItem('searchTerm', searchTerm);
                
                // Redirect to search results page
                window.location.href = 'search-results.html';
            }
        });
    }
    
    // Check if we're on the search results page
    if (window.location.pathname.includes('search-results.html')) {
        displaySearchResults();
    }
});

// Function to display search results
function displaySearchResults() {
    const searchTerm = sessionStorage.getItem('searchTerm') || '';
    const resultsContainer = document.getElementById('search-results');
    const searchTermDisplay = document.getElementById('search-term');
    
    if (searchTermDisplay) {
        searchTermDisplay.textContent = searchTerm;
    }
    
    if (!resultsContainer) return;
    
    // Filter products based on search term
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || 
               product.description.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
    
    // Display results
    if (filteredProducts.length > 0) {
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Create HTML for each product
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h1 class="product-card-h1">${product.name}</h1>
                    <h3 style="font-size: small; font-weight: 300; margin: 10px 0;">${product.description}</h3>
                    <p style="font-size: x-large; font-weight: 700; text-align: center; margin: 15px 0;">$${product.price.toFixed(2)}</p>
                </div>
                <div class="button">
                    <button class="product-btn" data-id="${product.id}">Add to cart</button>
                    <button class="details-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18C10 17.4696 10.2107 16.9609 10.5858 16.5858C10.9609 16.2107 11.4696 16 12 16C12.5304 16 13.0391 16.2107 13.4142 16.5858C13.7893 16.9609 14 17.4696 14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20ZM12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14ZM12 8C11.4696 8 10.9609 7.78929 10.5858 7.41421C10.2107 7.03914 10 6.53043 10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8Z" fill="black"/>
                    </svg></button>
                </div>
            `;
            
            // Add the product card to the results container
            resultsContainer.appendChild(productCard);
            
            // Add event listener to the "Add to cart" button
            const addToCartBtn = productCard.querySelector('.product-btn');
            addToCartBtn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    } else {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h2>No products found matching "${searchTerm}"</h2>
                <p>Try a different search term or browse our categories.</p>
            </div>
        `;
    }
}



// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    
    // Add or update item in cart
    if (cartItems[productId]) {
        cartItems[productId].quantity += 1;
        showNotification(`Added another ${product.name} to cart!`);
    } else {
        cartItems[productId] = {
            id: product.id,
            itemName: product.name,
            imagePic: product.image,
            price: product.price,
            quantity: 1
        };
        showNotification(`${product.name} added to cart!`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart display
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    let htmlDom = ``;
    const cartItemsLengthSpan = document.querySelector(".besket-shopping span");
    const cartContent = document.querySelector(".cart-content");
    
    if (!cartContent) return;
    
    if (Object.keys(cartItems).length > 0) {
        Object.values(cartItems).forEach((item) => {
            htmlDom += `
                <div class="cart-box" data-id="${item.id}">
                    <img src="${item.imagePic}" alt="Product image">
                    <div class="cart-detail">
                        <h2 class="cart-product-title">${item.itemName}</h2>
                        <span class="cart-price">$${item.price.toFixed(2)}</span>
                        <div class="cart-quantity">
                            <button class="decrement">-</button>
                            <span class="number">${item.quantity}</span>
                            <button class="increment">+</button>
                        </div>
                    </div>
                    <i class="fa-solid fa-trash cart-remove"></i>
                </div>
            `;
        });
        
        // Calculate total items
        const cartLength = Object.values(cartItems)
            .reduce((total, item) => total + item.quantity, 0);
            
        if (cartItemsLengthSpan) {
            cartItemsLengthSpan.textContent = cartLength;
        }
        
        document.querySelector(".error-cart").innerHTML = "";
    } else {
        if (cartItemsLengthSpan) {
            cartItemsLengthSpan.textContent = "0";
        }
    }
    
    // Update cart content
    cartContent.innerHTML = htmlDom;
    
    // Setup event listeners for cart items
    setupCartItemEventListeners();
    
    // Update total price
    const cartTotal = Math.ceil(Object.values(cartItems)
        .reduce((acc, item) => acc + (item.price * item.quantity), 0));
    const cartTotalElement = document.querySelector(".total-price");
    if (cartTotalElement) {
        cartTotalElement.innerHTML = `$${cartTotal}`;
    }
}

// Setup cart item event listeners
function setupCartItemEventListeners() {
    // Increment quantity
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            cartItems[itemId].quantity += 1;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });

    // Decrement quantity
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            if (cartItems[itemId].quantity > 1) {
                cartItems[itemId].quantity -= 1;
            } else {
                delete cartItems[itemId];
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });

    // Remove item
    document.querySelectorAll('.cart-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            delete cartItems[itemId];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });
}

// Add notification function
function showNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 200);
    }, 2000);
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);


