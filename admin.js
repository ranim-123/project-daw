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
        // Edit product
        document.querySelectorAll('.products-table .btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.querySelector('td:first-child').textContent;
                alert(`Edit product ${productId}`);
                // Here you would open a modal with a form to edit the product
            });
        });
        
        // Delete product
        document.querySelectorAll('.products-table .btn-action.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.querySelector('td:first-child').textContent;
                if (confirm(`Are you sure you want to delete product ${productId}?`)) {
                    row.remove();
                    // Here you would send an API request to delete the product
                }
            });
        });
        
        // Add new product
        document.querySelector('.btn-add').addEventListener('click', function() {
            alert('Add new product');
            // Here you would open a modal with a form to add a new product
        });
        
        // Filter products
        document.querySelector('#category-filter').addEventListener('change', filterProducts);
        document.querySelector('#status-filter').addEventListener('change', filterProducts);
        
        function filterProducts() {
            const categoryFilter = document.querySelector('#category-filter').value.toLowerCase();
            const statusFilter = document.querySelector('#status-filter').value.toLowerCase();
            
            document.querySelectorAll('.products-table tbody tr').forEach(row => {
                const category = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
                const status = row.querySelector('.status').textContent.toLowerCase();
                
                const categoryMatch = !categoryFilter || category.includes(categoryFilter);
                const statusMatch = !statusFilter || status.includes(statusFilter);
                
                if (categoryMatch && statusMatch) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
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
