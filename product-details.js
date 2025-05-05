
    // Function to show product details
    function showProductDetails(event) {
        const button = event.currentTarget;
        const productCard = button.closest('.product-card');
        const productId = button.getAttribute('data-product-id');
        
        // Get product details
        let productName, productImage, productPrice, productDescription;
        
        // Try to get details from the card
        try {
            productName = productCard.querySelector('h1').textContent;
            productImage = productCard.querySelector('.product-image').src;
            productPrice = productCard.querySelector('p').textContent;
            productDescription = productCard.querySelector('h3').textContent;
        } catch (error) {
            console.error('Error getting product details:', error);
            return;
        }
        
        // Create modal HTML
        const modalHTML = `
            <div class="product-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-body">
                        <div class="modal-image">
                            <img src="${productImage}" alt="${productName}">
                        </div>
                        <div class="modal-details">
                            <h2>${productName}</h2>
                            <p class="price">${productPrice}</p>
                            <p class="description">${productDescription}</p>
                            
                            <div class="size-selection">
                                <label>Size:</label>
                                <button class="size">S</button>
                                <button class="size">M</button>
                                <button class="size">L</button>
                                <button class="size">XL</button>
                            </div>
                            
                            <div class="color-selection">
                                <label>Colors:</label>
                                <span class="color" style="background-color: #e74c3c;"></span>
                                <span class="color" style="background-color: #3498db;"></span>
                                <span class="color" style="background-color: #2ecc71;"></span>
                                <span class="color" style="background-color: #000;"></span>
                            </div>
                            
                            <div class="quantity-selection">
                                <label>Quantity:</label>
                                <div class="quantity-controls">
                                    <button class="quantity-btn minus">-</button>
                                    <span class="quantity">1</span>
                                    <button class="quantity-btn plus">+</button>
                                </div>
                            </div>
                            
                            <div class="modal-buttons">
                                <button class="add-to-cart-btn">Add to Cart</button>
                                <button class="buy-now-btn">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to the DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Get the modal element
        const modal = document.querySelector('.product-modal');
        
        // Show the modal
        modal.style.display = 'flex';
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Size selection
        const sizeButtons = modal.querySelectorAll('.size');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                sizeButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
            });
        });
        
        // Color selection
        const colorButtons = modal.querySelectorAll('.color');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                colorButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
            });
        });
        
        // Quantity controls
        const minusBtn = modal.querySelector('.minus');
        const plusBtn = modal.querySelector('.plus');
        const quantitySpan = modal.querySelector('.quantity');
        let quantity = 1;
        
        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            quantity++;
            quantitySpan.textContent = quantity;
        });
        
        // Add to cart button
        const addToCartBtn = modal.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            // Get selected size and color
            const selectedSize = modal.querySelector('.size.active')?.textContent || 'M';
            const selectedColor = modal.querySelector('.color.active')?.style.backgroundColor || 'rgb(231, 76, 60)';
            
            // Call the existing addToCart function with additional parameters
            handleAddToCart(productId, quantity, selectedSize, selectedColor);
            
            // Close the modal
            modal.remove();
            
            // Show notification
            showNotification(`${productName} added to cart!`);
        });
        
        // Buy now button
        const buyNowBtn = modal.querySelector('.buy-now-btn');
        buyNowBtn.addEventListener('click', () => {
            // Get selected size and color
            const selectedSize = modal.querySelector('.size.active')?.textContent || 'M';
            const selectedColor = modal.querySelector('.color.active')?.style.backgroundColor || 'rgb(231, 76, 60)';
            
            // Call the existing addToCart function with additional parameters
            handleAddToCart(productId, quantity, selectedSize, selectedColor);
            
            // Close the modal
            modal.remove();
            
            // Redirect to checkout page based on current path
            const path = window.location.pathname;
            if (path.includes('/men/') || path.includes('/women/') || path.includes('/children/')) {
                window.location.href = "../pay-page.html";
            } else {
                window.location.href = "pay-page.html";
            }
        });
    }
    
    // Function to handle adding to cart with additional parameters
    function handleAddToCart(productId, quantity, size, color) {
        // Find the product button by ID
        const productCard = document.querySelector(`.product-btn[data-id="${productId}"]`)?.closest('.product-card');
        
        if (!productCard) {
            console.error('Product not found');
            return;
        }
        
        // Extract product information
        const productImg = productCard.querySelector('.product-image').src;
        const productTitle = productCard.querySelector('h1').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        
        // Check if handleClick function exists (from project-daw.js)
        if (typeof handleClick === 'function') {
            // Call the existing handleClick function
            handleClick(parseInt(productId));
            
            // Update the item in cartItems with additional parameters
            if (window.cartItems && window.cartItems[productId]) {
                window.cartItems[productId].size = size;
                window.cartItems[productId].color = color;
                window.cartItems[productId].quantity = quantity;
                
                // Update localStorage
                localStorage.setItem("cartItems", JSON.stringify(window.cartItems));
                
                // Update cart display
                if (typeof updateCartDisplay === 'function') {
                    updateCartDisplay();
                }
            }
        } else {
            // If handleClick doesn't exist, implement our own cart functionality
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
            
            // Create or update cart item
            cartItems[productId] = {
                id: productId,
                name: productTitle,
                price: parseFloat(productPrice.replace(/[^0-9.-]+/g, "")),
                image: productImg,
                quantity: quantity,
                size: size,
                color: color
            };
            
            // Save to localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            
            // Update cart icon if it exists
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const itemCount = Object.keys(cartItems).length;
                cartCount.textContent = itemCount;
                cartCount.style.display = itemCount > 0 ? 'block' : 'none';
            }
        }
        
        // Handle redirect to payment page based on current path
        const buyNowRedirect = () => {
            const path = window.location.pathname;
            if (path.includes('/men/') || path.includes('/women/') || path.includes('/children/')) {
                return "../pay-page.html";
            } else {
                return "pay-page.html";
            }
        };
    }
    
    // Function to show notification
    function showNotification(message) {
        // Check if notification function exists in project-daw.js
        if (typeof window.showNotification === 'function') {
            window.showNotification(message);
        } else {
            // Create our own notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            // Style the notification
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            notification.style.padding = '15px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            
            // Add to DOM
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
// Product details functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Add details buttons to all product cards if they don't already exist
    addDetailsButtonsToProducts();
    
    // Get all details buttons
    const detailsButtons = document.querySelectorAll('.details-btn');
    
    // Add click event listener to each button
    detailsButtons.forEach(button => {
        button.addEventListener('click', showProductDetails);
    });
    
    // Function to add details buttons to product cards
    function addDetailsButtonsToProducts() {
        // Find all product cards that don't already have details buttons
        const productCards = document.querySelectorAll('.product-card:not(:has(.details-btn))');
        
        productCards.forEach(card => {
            // Get the product ID from the add to cart button
            const addToCartBtn = card.querySelector('.product-btn');
            if (!addToCartBtn) return;
            
            const productId = addToCartBtn.getAttribute('data-id');
            if (!productId) return;
            
            // Create details button
            const detailsBtn = document.createElement('button');
            detailsBtn.className = 'details-btn';
            detailsBtn.setAttribute('data-product-id', productId);
            detailsBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>
            `;
            
            // Position the button in the button container if it exists
            const buttonContainer = card.querySelector('.button');
            if (buttonContainer) {
                buttonContainer.appendChild(detailsBtn);
            } else {
                // Otherwise add it directly to the card
                card.appendChild(detailsBtn);
            }
        });
    }


});