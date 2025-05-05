document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
        return;
    }
    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.top-nav').prepend(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Initialize simple charts
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    
    // Simplified Sales Chart
    new Chart(salesCtx, {
        type: 'line',
        data: {
             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 22000, 20000, 25000],
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78, 115, 223, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: value => '$' + value.toLocaleString()
                    }
                }
            }
        }
    });

    // Simplified Traffic Chart
    new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Referral', 'Social'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Simple sidebar menu toggle
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.sidebar-menu li').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Simple notification
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have new notifications');
    });
// Simple logout
document.querySelector('.logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    if(confirm('Logout?')) { // Asks for confirmation
        // Clear login state (optional, depends if main.html uses this flag)
        localStorage.removeItem('adminLoggedIn');

        // Redirect to MAIN page  <--- CHANGED HERE
        window.location.href = 'main.html';
    }
});

    // Section navigation
    document.querySelectorAll('.sidebar-menu li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active menu item
            document.querySelectorAll('.sidebar-menu li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Show the corresponding section
            const targetSection = this.getAttribute('data-section');
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Product management
    if (document.querySelector('.products-table')) {
        // Add new product
        document.querySelector('.btn-add').addEventListener('click', function() {
            // Create modal for adding new product
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Add New Product</h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form id="add-product-form">
                            <div class="form-group">
                                <label for="product-name">Product Name</label>
                                <input type="text" id="product-name" required>
                            </div>
                            <div class="form-group">
                                <label for="product-category">Category</label>
                                <select id="product-category" required>
                                    <option value="">Select Category</option>
                                    <option value="shoes">Shoes</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="product-price">Price ($)</label>
                                <input type="number" id="product-price" step="0.01" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="product-stock">Stock Quantity</label>
                                <input type="number" id="product-stock" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="product-description">Description</label>
                                <textarea id="product-description" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="product-image">Image URL</label>
                                <input type="text" id="product-image" placeholder="image-daw/product.png">
                            </div>
                            <div class="form-group">
                                <label>Upload Image</label>
                                <div class="file-upload">
                                    <input type="file" id="image-upload" accept="image/*">
                                    <label for="image-upload" class="file-upload-btn">Choose File</label>
                                    <span class="file-name">No file chosen</span>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn-cancel">Cancel</button>
                                <button type="submit" class="btn-save">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            // Add modal to the DOM
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.style.display = 'block';
                modal.classList.add('show');
            }, 10);
            
            // Close modal when clicking on X
            modal.querySelector('.close').addEventListener('click', () => {
                closeModal(modal);
            });
            
            // Close modal when clicking on Cancel
            modal.querySelector('.btn-cancel').addEventListener('click', () => {
                closeModal(modal);
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
            
            // Handle file upload
            const fileUpload = modal.querySelector('#image-upload');
            const fileName = modal.querySelector('.file-name');
            
            fileUpload.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    fileName.textContent = this.files[0].name;
                    
                    // Preview image (optional)
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // If you want to show a preview
                        // const preview = document.createElement('img');
                        // preview.src = e.target.result;
                        // preview.style.maxWidth = '100%';
                        // preview.style.marginTop = '10px';
                        // modal.querySelector('.file-upload').appendChild(preview);
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });
            
            // Handle form submission
            const form = modal.querySelector('#add-product-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('product-name').value;
                const category = document.getElementById('product-category').value;
                const price = parseFloat(document.getElementById('product-price').value);
                const stock = parseInt(document.getElementById('product-stock').value);
                const description = document.getElementById('product-description').value;
                const imageUrl = document.getElementById('product-image').value || 'image-daw/placeholder.png';
                
                // Create new product object
                const newProduct = {
                    id: generateProductId(),
                    name: name,
                    category: category,
                    price: price,
                    stock: stock,
                    description: description,
                    image: imageUrl
                };
                
                // In a real application, you would send this to your backend API
                // For now, we'll just add it to the table
                addProductToTable(newProduct);
                
                // Close the modal
                closeModal(modal);
                
                // Show success notification
                showNotification('Product added successfully!');
            });
        });
        
        // Function to close modal
        function closeModal(modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        // Function to generate a product ID
        function generateProductId() {
            // Get the highest product ID from the table
            const productRows = document.querySelectorAll('.products-table tbody tr');
            let highestId = 0;
            
            productRows.forEach(row => {
                const idText = row.querySelector('td:first-child').textContent;
                const idNum = parseInt(idText.replace('#PRD-', ''));
                if (idNum > highestId) {
                    highestId = idNum;
                }
            });
            
            // Return the next ID
            const nextId = highestId + 1;
            return `#PRD-${nextId.toString().padStart(3, '0')}`;
        }
        
        // Function to add product to table
        function addProductToTable(product) {
            const tableBody = document.querySelector('.products-table tbody');
            const newRow = document.createElement('tr');
            
            // Determine status based on stock
            let status = 'In Stock';
            let statusClass = 'completed';
            
            if (product.stock === 0) {
                status = 'Out of Stock';
                statusClass = 'cancelled';
            } else if (product.stock < 15) {
                status = 'Low Stock';
                statusClass = 'pending';
            }
            
            newRow.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${product.image}" alt="Product" class="product-thumbnail"></td>
                <td>${product.name}</td>
                <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><span class="status ${statusClass}">${status}</span></td>
                <td>
                    <button class="btn-action edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            // Add to table
            tableBody.appendChild(newRow);
            
            // Add event listeners to new buttons
            const editBtn = newRow.querySelector('.btn-action.edit');
            const deleteBtn = newRow.querySelector('.btn-action.delete');
            
            editBtn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.querySelector('td:first-child').textContent;
                alert(`Edit product ${productId}`);
                // Here you would open a modal with a form to edit the product
            });
            
            deleteBtn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.querySelector('td:first-child').textContent;
                if (confirm(`Are you sure you want to delete product ${productId}?`)) {
                    row.remove();
                    // Here you would send an API request to delete the product
                }
            });
        }
        
        // Function to show notification
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            // Add to DOM
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
                }, 300);
            }, 3000);
        }
    }
    
    // Order management
    if (document.querySelector('.orders-table')) {
        // View order details
        document.querySelectorAll('.orders-table .btn-action.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const orderId = row.querySelector('td:first-child').textContent;
                alert(`View order details for ${orderId}`);
                // Here you would open a modal with order details
            });
        });
        
        // Print order
        document.querySelectorAll('.orders-table .btn-action.print').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const orderId = row.querySelector('td:first-child').textContent;
                alert(`Print order ${orderId}`);
                // Here you would trigger the print function
            });
        });
        
        // Cancel order
        document.querySelectorAll('.orders-table .btn-action.cancel').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const orderId = row.querySelector('td:first-child').textContent;
                if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
                    row.remove();
                    // Here you would send an API request to cancel the order
                }
            });
        });
        
        // Filter orders
        document.querySelector('#order-status-filter').addEventListener('change', filterOrders);
        
        function filterOrders() {
            const statusFilter = document.querySelector('#order-status-filter').value.toLowerCase();
            
            document.querySelectorAll('.orders-table tbody tr').forEach(row => {
                const status = row.querySelector('.status').textContent.toLowerCase();
                
                const statusMatch = !statusFilter || status.includes(statusFilter);
                
                if (statusMatch) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    }
});
