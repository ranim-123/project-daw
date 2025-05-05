// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart variables
    const cartIcon = document.querySelector('.besket-shopping');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#cart-close');
    const cartContent = document.querySelector('.cart-content');
    const totalPrice = document.querySelector('.total-price');
    const cartCount = document.querySelector('.besket-shopping span');
    const buyButton = document.querySelector('.btn-buy');
    const errorCart = document.querySelector('.error-cart');
    
    // Open cart
    cartIcon.addEventListener('click', () => {
        cart.classList.add('active');
    });
    
    // Close cart
    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
    });
    
    // Add to cart
    document.querySelectorAll('.product-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Buy now
    buyButton.addEventListener('click', () => {
        if (cartContent.children.length === 0) {
            errorCart.textContent = 'Your cart is empty. Add some products first.';
            setTimeout(() => {
                errorCart.textContent = '';
            }, 3000);
            return;
        }
        
        // Clear cart
        cartContent.innerHTML = '';
        updateTotal();
        updateCartCount();
        
        // Show success message
        errorCart.textContent = 'Your order has been placed successfully!';
        errorCart.style.color = 'green';
        setTimeout(() => {
            errorCart.textContent = '';
            errorCart.style.color = '';
        }, 3000);
    });
    
    // Add to cart function
    function addToCart(event) {
        const button = event.target;
        const productCard = button.closest('.product-card');
        const productId = button.getAttribute('data-id');
        const productImg = productCard.querySelector('.product-image').src;
        const productTitle = productCard.querySelector('h1').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        
        // Check if product already in cart
        const cartItems = cartContent.querySelectorAll('.cart-box');
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].getAttribute('data-id') === productId) {
                // Increase quantity instead of adding new item
                const quantityElement = cartItems[i].querySelector('.cart-quantity');
                quantityElement.value = parseInt(quantityElement.value) + 1;
                updateTotal();
                return;
            }
        }
        
        // Add new item to cart
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.setAttribute('data-id', productId);
        
        const cartBoxContent = `
            <img src="${productImg}" alt="${productTitle}" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${productTitle}</div>
                <div class="cart-price">${productPrice}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
        `;
        
        cartBox.innerHTML = cartBoxContent;
        cartContent.appendChild(cartBox);
        
        // Add event listeners to new cart item
        cartBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
        cartBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
        
        updateTotal();
        updateCartCount();
        
        // Send to server (in a real app)
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                title: productTitle,
                price: productPrice,
                quantity: 1
            })
        });
    }
    
    // Remove cart item
    function removeCartItem(event) {
        const buttonClicked = event.target;
        buttonClicked.closest('.cart-box').remove();
        updateTotal();
        updateCartCount();
    }
    
    // Quantity changes
    function quantityChanged(event) {
        const input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }
    
    // Update total
    function updateTotal() {
        const cartBoxes = document.querySelectorAll('.cart-box');
        let total = 0;
        
        cartBoxes.forEach(cartBox => {
            const priceElement = cartBox.querySelector('.cart-price');
            const quantityElement = cartBox.querySelector('.cart-quantity');
            
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            const quantity = parseInt(quantityElement.value);
            
            total += price * quantity;
        });
        
        // Round to 2 decimal places
        total = Math.round(total * 100) / 100;
        totalPrice.textContent = '$' + total.toFixed(2);
    }
    
    // Update cart count
    function updateCartCount() {
        const cartBoxes = document.querySelectorAll('.cart-box');
        let count = 0;
        
        cartBoxes.forEach(cartBox => {
            const quantityElement = cartBox.querySelector('.cart-quantity');
            count += parseInt(quantityElement.value);
        });
        
        cartCount.textContent = count;
    }
});