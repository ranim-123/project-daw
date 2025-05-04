function validateLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation - in a real app, this would be a server request
    if (username === 'ranim' && password === 'ranim123') {
        // Store login state in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        
        // Redirect to admin panel
        window.location.href = 'admin.html';
        return true;
    } else {
        alert('Invalid username or password. Try admin/admin123');
        return false;
    }
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordLink = document.getElementById('forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Please contact system administrator to reset your password.');
    });
});
