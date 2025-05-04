// تحديد العناصر المتعلقة بأيقونة السلة، السلة نفسها، وزر الإغلاق
const cartIcon = document.querySelector(".besket-shopping");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// عند الضغط على أيقونة السلة، يتم إظهار السلة
cartIcon.addEventListener("click", () => cart.classList.add("active"));

// عند الضغط على زر الإغلاق، يتم إخفاء السلة
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// تحديد كل أزرار "أضف إلى السلة"
const addCartButtons = document.querySelectorAll(".product-btn");

// تعريف المصفوفة التي تحتوي على كل المنتجات المتاحة
const items = [
    // كل عنصر عبارة عن كائن يحتوي على: id, الاسم، الصورة، والسعر
    { id: 1, itemName: "Air Huarache RUN", imagePic: "image-daw/shoes5.png", price: 99.99 },
    { id: 2, itemName: "NIKE AIR ZOOM", imagePic: "image-daw/shoes3.png", price: 149.99 },
    { id: 3, itemName: "NIKE FREE RUNNING", imagePic: "image-daw/shoes6.png", price: 74.99 },
    { id: 4, itemName: "NIKE ZOOM KOBE IX 9", imagePic: "image-daw/shoes1.png", price: 199.99 },
    { id: 5, itemName: "t-shirt slim", imagePic: "image-daw/t-shirt1-removebg-preview.png", price: 14.99 },
    { id: 6, itemName: "black slim t-shirt", imagePic: "image-daw/t-shirt2-removebg-preview.png", price: 15.99 },
    { id: 7, itemName: "sport t-shirt (black)", imagePic: "image-daw/t-shirt3-removebg-preview.png", price: 19.99 },
    { id: 8, itemName: "RED T-SHIRT (slim fit)", imagePic: "image-daw/t-shirt4-removebg-preview.png", price: 24.99 },
    { id: 9, itemName: "gris DRESS (classic)", imagePic: "image-daw/dresse1-removebg-preview.png", price: 199.99 },
    { id: 10, itemName: "pransees dress (slim fit)", imagePic: "image-daw/dresse2-removebg-preview.png", price: 299.99 },
    { id: 11, itemName: "RED DRESS (slim fit)", imagePic: "image-daw/dresse3-removebg-preview.png", price: 399.99 },
    { id: 12, itemName: "black DRESS (classic)", imagePic: "image-daw/dresse4-removebg-preview.png", price: 499.99 },
];

let cartItems = {};
// تعريف كائن يحتوي على العناصر الموجودة في السلة

if (localStorage.getItem("cartItems")){
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
}
// المتغيرات الخاصة بالمجموع الكلي وعدد المنتجات
let cartTotal = 0;
let cartLength = 0;

// ربط كل زر "أضف إلى السلة" بوظيفة handleClick وتحديث عرض السلة
addCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        handleClick(index + 1); // تمرير رقم المنتج بناءً على index
        updateCartDisplay();    // تحديث واجهة عرض السلة
    });
});

// هذه الدالة تضيف المنتج إلى السلة أو تزيد الكمية إذا كان مضاف مسبق
const handleClick = (itemId) => {
    if (cartItems[itemId]) {
        // If already in cart, increase quantity
        cartItems[itemId].quantity += 1;
        showNotification(`Added another ${cartItems[itemId].itemName} to cart!`);
    } else {
        // If not in cart, add it
        const foundItem = items.find((item) => item.id === itemId);
        if (foundItem) {
            cartItems[itemId] = { ...foundItem, quantity: 1 };
            showNotification(`${foundItem.itemName} added to cart!`);
        }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// حساب السعر الإجمالي لكل المنتجات داخل السلة
const handleUpdateTotalCart = () => {
    cartTotal = Math.ceil(Object.values(cartItems)
        .reduce((acc, item) => acc + (item.price * item.quantity), 0)); // جمع (السعر × الكمية)
}

// دالة لتحديث واجهة عرض السلة (المنتجات، السعر، الكمية، ...)
function updateCartDisplay() {
    let htmlDom = ``;
    const cartItemsLengthSpan = document.querySelector("body > header > div.nav-icons > div > span");

    if (Object.keys(cartItems).length > 0) {
        // إذا في منتجات بالسلة، نبني الـ HTML الخاص بها
        Object.values(cartItems).forEach((item) => {
            // Fix image path based on current location
            let imagePath = item.imagePic;
            
            // Check if we're in a subdirectory
            const path = window.location.pathname;
            if (path.includes('/men/') || path.includes('/women/') || path.includes('/children/')) {
                // If image path doesn't already have ../ prefix, add it
                if (!imagePath.startsWith('../')) {
                    imagePath = '../' + imagePath;
                }
            }
            
            // Handle relative paths for images
            if (imagePath.includes('image-daw/') && !imagePath.includes('../image-daw/') && 
                (path.includes('/men/') || path.includes('/women/') || path.includes('/children/'))) {
                imagePath = imagePath.replace('image-daw/', '../image-daw/');
            }
            
            htmlDom += `
                <div class="cart-box" data-id="${item.id}">
                    <img src="${imagePath}" alt="Product image">
                    <div class="cart-detail">
                        <h2 class="cart-product-title">${item.itemName}</h2>
                        <span class="cart-price">$${item.price}</span>
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

        // حساب العدد الإجمالي للعناصر
        cartLength = Object.values(cartItems)
            .map((item) => item.quantity)
            .reduce((a, b) => a + b, 0);
        
        const errorElement = document.querySelector(".error-cart");
        if (errorElement) {
            errorElement.innerHTML = "";
        }
    } else {
        cartLength = 0;
    }

    // عرض عدد العناصر بجانب أيقونة السلة
    if (cartItemsLengthSpan) {
        cartItemsLengthSpan.innerHTML = cartLength;
    }

    // تحديث واجهة عرض السلة بالمحتوى الجديد
    const cartContent = document.querySelector(".cart-content");
    if (cartContent) {
        cartContent.innerHTML = htmlDom;
        setupCartItemEventListeners(); // تجهيز الأزرار داخل السلة (زيادة/نقصان/حذف)
    }

    // تحديث السعر الإجمالي
    handleUpdateTotalCart();
    const cartTotalElement = document.querySelector(".total-price");
    if (cartTotalElement) {
        cartTotalElement.innerHTML = `$${cartTotal}`;
    }
}

// عند الضغط على زر الشراء:
document.addEventListener('DOMContentLoaded', function() {
    const buyButton = document.querySelector(".btn-buy");
    
    if (buyButton) {
        buyButton.addEventListener("click", () => {
            if (Object.keys(cartItems).length > 0) {
                // Check if we're in a subdirectory
                const path = window.location.pathname;
                if (path.includes('/men/') || path.includes('/women/') || path.includes('/children/')) {
                    window.location.href = "../pay-page.html";
                } else {
                    window.location.href = "pay-page.html";
                }
                console.log("Redirecting to payment page"); // Debug log
            } else {
                // إذا كانت السلة فارغة، نعرض رسالة خطأ
                const errorElement = document.querySelector(".error-cart");
                if (errorElement) {
                    errorElement.innerHTML = "You must have at least one item in the cart to continue in the purchase process";
                }
                console.log("Cart is empty, showing error"); // Debug log
            }
        });
    } else {
        console.error("Buy button not found");
    }
}); // Add this function to create and show the notification
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

// هذه الدالة تضيف مستمعات الأحداث لعناصر السلة (أزرار + و - وحذف)
function setupCartItemEventListeners() {
    // زر زيادة الكمية
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            cartItems[itemId].quantity += 1;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });

    // زر تقليل الكمية أو الحذف إذا وصلت الكمية لـ 1
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            if (cartItems[itemId].quantity > 1) {
                cartItems[itemId].quantity -= 1;
            } else {
                delete cartItems[itemId];
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });

    // زر حذف المنتج من السلة
    document.querySelectorAll('.cart-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartBox = e.target.closest('.cart-box');
            const itemId = parseInt(cartBox.dataset.id);
            delete cartItems[itemId];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });
}

// استدعاء أولي لتحديث عرض السلة عند تحميل الصفحة
updateCartDisplay();

// Remove duplicate showNotification function
// The function is already defined earlier in the file

