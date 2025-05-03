document.addEventListener('DOMContentLoaded', function() {
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
        if(confirm('Logout?')) {
            alert('Logged out');
        }
    });
});
