// قاعدة بيانات المنتجات - عادة ما تأتي من واجهة برمجة تطبيقات خلفية
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

// تهيئة وظيفة البحث عند تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي للنموذج
            const searchTerm = searchInput.value.trim().toLowerCase(); // تنظيف وتحويل مصطلح البحث إلى أحرف صغيرة
            
            if (searchTerm.length > 0) {
                // حفظ مصطلح البحث في تخزين الجلسة
                sessionStorage.setItem('searchTerm', searchTerm);
                
                // إعادة التوجيه إلى صفحة نتائج البحث
                window.location.href = 'search-results.html';
            }
        });
    }
    
    // التحقق مما إذا كنا في صفحة نتائج البحث
    if (window.location.pathname.includes('search-results.html')) {
        displaySearchResults();
    }
});

// دالة لعرض نتائج البحث
function displaySearchResults() {
    const searchTerm = sessionStorage.getItem('searchTerm') || ''; // الحصول على مصطلح البحث من تخزين الجلسة
    const resultsContainer = document.getElementById('search-results');
    const searchTermDisplay = document.getElementById('search-term');
    
    // عرض مصطلح البحث في الصفحة
    if (searchTermDisplay) {
        searchTermDisplay.textContent = searchTerm;
    }
    
    if (!resultsContainer) return; // التأكد من وجود حاوية النتائج
    
    // تصفية المنتجات بناءً على مصطلح البحث
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || 
               product.description.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
    
    // عرض النتائج
    if (filteredProducts.length > 0) {
        // مسح النتائج السابقة
        resultsContainer.innerHTML = '';
        
        // إنشاء HTML لكل منتج
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
                    <!-- رمز SVG للزر -->
                    </svg></button>
                </div>
            `;
            
            // إضافة بطاقة المنتج إلى حاوية النتائج
            resultsContainer.appendChild(productCard);
            
            // إضافة مستمع حدث لزر "إضافة إلى السلة"
            const addToCartBtn = productCard.querySelector('.product-btn');
            addToCartBtn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    } else {
        // عرض رسالة عندما لا توجد نتائج
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h2>No products found matching "${searchTerm}"</h2>
                <p>Try a different search term or browse our categories.</p>
            </div>
        `;
    }
}



// دالة لإضافة منتج إلى سلة التسوق
function addToCart(productId) {
    const product = products.find(p => p.id === productId); // البحث عن المنتج بواسطة المعرف
    if (!product) return;
    
    // الحصول على عناصر سلة التسوق الموجودة من التخزين المحلي
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    
    // إضافة أو تحديث العنصر في السلة
    if (cartItems[productId]) {
        // إذا كان المنتج موجودًا بالفعل، زيادة الكمية
        cartItems[productId].quantity += 1;
        showNotification(`Added another ${product.name} to cart!`);
    } else {
        // إذا كان منتجًا جديدًا، إضافته إلى السلة
        cartItems[productId] = {
            id: product.id,
            itemName: product.name,
            imagePic: product.image,
            price: product.price,
            quantity: 1
        };
        showNotification(`${product.name} added to cart!`);
    }
    
    // حفظ السلة المحدثة في التخزين المحلي
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // تحديث عرض السلة
    updateCartDisplay();
}

// دالة لتحديث عرض سلة التسوق
function updateCartDisplay() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    let htmlDom = ``;
    const cartItemsLengthSpan = document.querySelector(".besket-shopping span");
    const cartContent = document.querySelector(".cart-content");
    
    if (!cartContent) return; // التأكد من وجود عنصر محتوى السلة
    
    if (Object.keys(cartItems).length > 0) {
        // إنشاء HTML لكل عنصر في السلة
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
        
        // حساب إجمالي العناصر
        const cartLength = Object.values(cartItems)
            .reduce((total, item) => total + item.quantity, 0);
            
        // تحديث عدد العناصر في أيقونة السلة
        if (cartItemsLengthSpan) {
            cartItemsLengthSpan.textContent = cartLength;
        }
        
        // مسح رسالة الخطأ إذا كانت موجودة
        document.querySelector(".error-cart").innerHTML = "";
    } else {
        // إذا كانت السلة فارغة، تعيين العدد إلى صفر
        if (cartItemsLengthSpan) {
            cartItemsLengthSpan.textContent = "0";
        }
    }
    
    // تحديث محتوى السلة
    cartContent.innerHTML = htmlDom;
    
    // إعداد مستمعات الأحداث لعناصر السلة
    setupCartItemEventListeners();
    
    // تحديث السعر الإجمالي
    const cartTotal = Math.ceil(Object.values(cartItems)
        .reduce((acc, item) => acc + (item.price * item.quantity), 0));
    const cartTotalElement = document.querySelector(".total-price");
    if (cartTotalElement) {
        cartTotalElement.innerHTML = `$${cartTotal}`;
    }
}

// إعداد مستمعات أحداث عناصر السلة
function setupCartItemEventListeners() {
    // زيادة الكمية
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

    // تقليل الكمية
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            if (cartItems[itemId].quantity > 1) {
                // إذا كانت الكمية أكبر من 1، تقليلها
                cartItems[itemId].quantity -= 1;
            } else {
                // إذا كانت الكمية 1، إزالة العنصر من السلة
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
            const itemId = parseInt(cartBox.dataset.id);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            delete cartItems[itemId];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });
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
    
    // إخفاء وإزالة بعد ثانيتين
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 200);
    }, 2000);
}

// تحديث عدد عناصر السلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateCartCount);

// دالة لتحديث عدد عناصر السلة
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    const cartItemsLengthSpan = document.querySelector(".besket-shopping span");
    
    if (cartItemsLengthSpan) {
        // حساب إجمالي العناصر في السلة
        const cartLength = Object.values(cartItems)
            .reduce((total, item) => total + item.quantity, 0);
        
        // تحديث النص
        cartItemsLengthSpan.textContent = cartLength;
    }
}

