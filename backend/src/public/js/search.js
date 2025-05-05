// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm.length === 0) {
            return;
        }
        
        // Send search request to server
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ term: searchTerm })
        })
        .then(response => response.json())
        .then(results => {
            // In a real app, you would display search results
            // For now, just log them and alert the user
            console.log('Search results:', results);
            
            if (results.length === 0) {
                alert('No products found matching "' + searchTerm + '"');
            } else {
                alert('Found ' + results.length + ' products matching "' + searchTerm + '". Check console for details.');
            }
            
            searchInput.value = '';
        })
        .catch(error => {
            console.error('Error searching products:', error);
        });
    });
});