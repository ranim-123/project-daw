
    // دالة للتعامل مع إضافة المنتج إلى سلة التسوق مع معلمات إضافية
    function handleAddToCart(productId, quantity, size, color) {
        // البحث عن زر المنتج بواسطة المعرف
        const productBtn = document.querySelector(`.product-btn[data-id="${productId}"]`);
        const productCard = productBtn?.closest('.product-card');
        
        if (!productCard) {
            console.error('Product not found');
            return;
        }
        
        // استخراج معلومات المنتج
        const productImg = productCard.querySelector('.product-image').src;
        const productTitle = productCard.querySelector('h1').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        
        // الحصول على عناصر سلة التسوق الموجودة
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
        
        // إنشاء أو تحديث عنصر سلة التسوق
        cartItems[productId] = {
            id: productId,
            itemName: productTitle,
            imagePic: productImg,
            price: parseFloat(productPrice.replace(/[^0-9.-]+/g, "")),
            quantity: quantity,
            size: size,
            color: color
        };
        
        // حفظ في التخزين المحلي
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        
        // تحديث عرض عدد العناصر في السلة
        const cartCount = document.querySelector('.besket-shopping span');
        if (cartCount) {
            const itemCount = Object.keys(cartItems).length;
            cartCount.textContent = itemCount;
            cartCount.style.display = itemCount > 0 ? 'block' : 'none';
        }
        
        // تحديث عرض السلة إذا كانت الدالة موجودة
        if (typeof updateCartDisplay === 'function') {
            updateCartDisplay();
        }
        
        // تشغيل النقر على زر إضافة إلى السلة الفعلي للتأكد من تشغيل أي معالجات أحداث أخرى
        if (productBtn && typeof productBtn.click === 'function') {
            // سنستخدم حدثًا مخصصًا لتجنب الحلقات اللانهائية
            const customEvent = new CustomEvent('addToCartFromModal', { 
                bubbles: true,
                detail: { quantity, size, color }
            });
            productBtn.dispatchEvent(customEvent);
        }
    }
    
    // دالة لعرض الإشعارات
    function showNotification(message) {
        // إزالة أي إشعار موجود
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // إنشاء إشعار جديد
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إخفاء وإزالة بعد 3 ثوانٍ
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 200);
        }, 2000);
    }
// دالة لعرض تفاصيل المنتج
function showProductDetails(event) {
    const button = event.currentTarget;
    const productCard = button.closest('.product-card');
    const productId = button.getAttribute('data-product-id');
    
    // الحصول على تفاصيل المنتج
    let productName, productImage, productPrice, productDescription;
    
    // محاولة الحصول على التفاصيل من البطاقة
    try {
        productName = productCard.querySelector('h1').textContent;
        productImage = productCard.querySelector('.product-image').src;
        productPrice = productCard.querySelector('p').textContent;
        productDescription = productCard.querySelector('h3')?.textContent || 'No description available';
    } catch (error) {
        console.error('Error getting product details:', error);
        return;
    }
    
    // إنشاء HTML للنافذة المنبثقة
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
    
    // إضافة النافذة المنبثقة إلى DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // الحصول على عنصر النافذة المنبثقة
    const modal = document.querySelector('.product-modal');
    
    // إظهار النافذة المنبثقة
    modal.style.display = 'flex';
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // اختيار المقاس
    const sizeButtons = modal.querySelectorAll('.size');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            sizeButtons.forEach(b => b.classList.remove('active'));
            // إضافة الفئة النشطة إلى الزر المنقور
            btn.classList.add('active');
        });
    });
    
    // تعيين المقاس النشط الافتراضي
    sizeButtons[1].classList.add('active'); // M هو النشط افتراض<|im_start|>
    
    // اختيار اللون
    const colorButtons = modal.querySelectorAll('.color');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            colorButtons.forEach(b => b.classList.remove('active'));
            // إضافة الفئة النشطة إلى الزر المنقور
            btn.classList.add('active');
        });
    });
    
    // تعيين اللون النشط الافتراضي
    colorButtons[0].classList.add('active'); // اللون الأول هو النشط افتراض س
    
    // التحكم في الكمية
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
    
    // زر إضافة إلى السلة
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        // الحصول على المقاس واللون المحددين
        const selectedSize = modal.querySelector('.size.active')?.textContent || 'M';
        const selectedColor = modal.querySelector('.color.active')?.style.backgroundColor || 'rgb(231, 76, 60)';
        
        // استدعاء الدالة لإضافة إلى السلة
        handleAddToCart(productId, quantity, selectedSize, selectedColor);
        
        // إغلاق النافذة المنبثقة
        modal.remove();
        
        // عرض إشعار
        showNotification(`${productName} added to cart!`);
    });
    
    // زر الشراء الآن
    const buyNowBtn = modal.querySelector('.buy-now-btn');
    buyNowBtn.addEventListener('click', () => {
        // الحصول على المقاس واللون المحددين
        const selectedSize = modal.querySelector('.size.active')?.textContent || 'M';
        const selectedColor = modal.querySelector('.color.active')?.style.backgroundColor || 'rgb(231, 76, 60)';
        
        // استدعاء الدالة لإضافة إلى السلة
        handleAddToCart(productId, quantity, selectedSize, selectedColor);
        
        // إغلاق النافذة المنبثقة
        modal.remove();
        
        // إعادة التوجيه إلى صفحة الدفع بناءً على المسار الحالي
        const path = window.location.pathname;
        if (path.includes('/men/') || path.includes('/women/') || path.includes('/children/')) {
            window.location.href = "../pay-page.html";
        } else {
            window.location.href = "pay-page.html";
        }
    });
}

// وظائف تفاصيل المنتج لجميع الصفحات
document.addEventListener('DOMContentLoaded', function() {
    // إضافة أزرار التفاصيل لجميع بطاقات المنتجات إذا لم تكن موجودة بالفعل
    addDetailsButtonsToProducts();
    
    // الحصول على جميع أزرار التفاصيل
    const detailsButtons = document.querySelectorAll('.details-btn');
    
    // إضافة مستمع حدث النقر لكل زر
    detailsButtons.forEach(button => {
        button.addEventListener('click', showProductDetails);
    });
    
    // دالة لإضافة أزرار التفاصيل إلى بطاقات المنتجات
    function addDetailsButtonsToProducts() {
        // البحث عن جميع بطاقات المنتجات التي لا تحتوي بالفعل على أزرار التفاصيل
        const productCards = document.querySelectorAll('.product-card:not(:has(.details-btn))');
        
        productCards.forEach(card => {
            // الحصول على معرف المنتج من زر إضافة إلى السلة
            const addToCartBtn = card.querySelector('.product-btn');
            if (!addToCartBtn) return;
            
            const productId = addToCartBtn.getAttribute('data-id');
            if (!productId) return;
            
            // إنشاء زر التفاصيل
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
            
            // وضع الزر في حاوية الأزرار إذا كانت موجودة
            const buttonContainer = card.querySelector('.button');
            if (buttonContainer) {
                buttonContainer.appendChild(detailsBtn);
            } else {
                // وإلا إضافته مباشرة إلى البطاقة
                card.appendChild(detailsBtn);
            }
        });
    }
    
    // تهيئة عرض السلة إذا كانت دالة updateCartDisplay موجودة
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    } else {
        // إنشاء دالة updateCartDisplay الخاصة بنا إذا لم تكن موجودة
        window.updateCartDisplay = function() {
            const cartContent = document.querySelector('.cart-content');
            const totalPrice = document.querySelector('.total-price');
            const cartCount = document.querySelector('.besket-shopping span');
            
            if (!cartContent || !totalPrice || !cartCount) return;
            
            // الحصول على عناصر السلة من التخزين المحلي
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            
            // تحديث عدد العناصر في السلة
            const itemCount = Object.keys(cartItems).length;
            cartCount.textContent = itemCount;
            cartCount.style.display = itemCount > 0 ? 'block' : 'none';
            
            // مسح محتوى السلة
            cartContent.innerHTML = '';
            
            // حساب السعر الإجمالي
            let total = 0;
            
            // إضافة كل عنصر إلى السلة
            for (const id in cartItems) {
                const item = cartItems[id];
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity);
                
                total += price * quantity;
                
                // إنشاء HTML لعنصر السلة
                const cartBox = document.createElement('div');
                cartBox.className = 'cart-box';
                cartBox.setAttribute('data-id', id);
                
                cartBox.innerHTML = `
                    <img src="${item.imagePic || item.image}" alt="${item.itemName || item.name}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${item.itemName || item.name}</div>
                        <div class="cart-price">$${price.toFixed(2)}</div>
                        <div class="cart-quantity">
                            <button class="decrement">-</button>
                            <span class="number">${quantity}</span>
                            <button class="increment">+</button>
                        </div>
                        ${item.size ? `<div class="cart-size">Size: ${item.size}</div>` : ''}
                        ${item.color ? `<div class="cart-color">Color: <span style="background-color:${item.color};width:15px;height:15px;display:inline-block;border-radius:50%;"></span></div>` : ''}
                    </div>
                    <i class="fa-solid fa-trash cart-remove"></i>
                `;
                
                cartContent.appendChild(cartBox);
            }
            
            // تحديث السعر الإجمالي
            totalPrice.textContent = `$${total.toFixed(2)}`;
            
            // إضافة مستمعات الأحداث لعناصر السلة
            setupCartItemEventListeners();
        };
        
        // إعداد مستمعات أحداث عناصر السلة
        function setupCartItemEventListeners() {
            // زيادة الكمية
            document.querySelectorAll('.increment').forEach(button => {
                button.addEventListener('click', (e) => {
                    const cartBox = e.target.closest('.cart-box');
                    const itemId = cartBox.dataset.id;
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
                    cartItems[itemId].quantity += 1;
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartDisplay();
                });
            });
            
            // تقليل الكمية
            document.querySelectorAll('.decrement').forEach(button => {
                button.addEventListener('click', (e) => {
                    const cartBox = e.target.closest('.cart-box');
                    const itemId = cartBox.dataset.id;
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
            
            // إزالة العنصر
            document.querySelectorAll('.cart-remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    const cartBox = e.target.closest('.cart-box');
                    const itemId = cartBox.dataset.id;
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
                    delete cartItems[itemId];
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartDisplay();
                });
            });
        }
        
        // تهيئة عرض السلة
        updateCartDisplay();
        
        // إضافة مستمع حدث لزر الشراء
        const buyButton = document.querySelector('.btn-buy');
        if (buyButton) {
            buyButton.addEventListener('click', () => {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
                if (Object.keys(cartItems).length > 0) {
                    // إعادة التوجيه إلى صفحة الدفع بناءً على المسار الحالي
                    const path = window.location.pathname;
                    if (path.includes('/men/') || path.includes('/women/') || path.includes('/children/')) {
                        window.location.href = "../pay-page.html";
                    } else {
                        window.location.href = "pay-page.html";
                    }
                } else {
                    // عرض رسالة خطأ إذا كانت السلة فارغة
                    const errorElement = document.querySelector('.error-cart');
                    if (errorElement) {
                        errorElement.textContent = "You must have at least one item in the cart to continue in the purchase process";
                        setTimeout(() => {
                            errorElement.textContent = '';
                        }, 3000);
                    }
                }
            });
        }
    }
});


