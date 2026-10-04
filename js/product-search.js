jQuery(document).ready(function($) {
    var searchInput = $('#product-search-input');
    var resultsContainer = $('<div id="search-results-dropdown"></div>'); // A container for suggestions

    searchInput.after(resultsContainer); // Place the container right after the input

    // Function to fetch and display results
    function fetchResults(searchTerm) {
        $.ajax({
            url: ajax_object.ajax_url, // WordPress AJAX URL
            type: 'POST',
            data: {
                action: 'live_product_search', // The PHP function to call
                search_term: searchTerm
            },
            success: function(response) {
                // Display the results in the dropdown
                resultsContainer.html(response).show();
            }
        });
    }

    // A. Show suggestions when the field is clicked (initial load)
    searchInput.on('focus', function() {
        if (!searchInput.val()) { // Only fetch if input is empty
             fetchResults(''); // Fetch initial suggestions (tags/popular products)
        }
    });

    // B. Show suggestions as the user types
    searchInput.on('keyup', function() {
        var term = $(this).val();
        if (term.length > 2) { // Start searching after 2 characters
            fetchResults(term);
        } else if (term.length === 0) {
            fetchResults(''); // Show initial suggestions again
        } else {
            resultsContainer.empty().hide();
        }
    });

    // Hide results when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.main-form').length) {
            resultsContainer.hide();
        }
    });
    
    // Optional: Clicking a suggestion fills the input and submits/searches
    resultsContainer.on('click', 'li a', function(e) {
        // Option 1: Fill input and let user submit
        // searchInput.val($(this).text());
        // resultsContainer.hide();
        
        // Option 2: Go directly to the product/tag page
        // window.location.href = $(this).attr('href');
        
        // Option 3: Fill input and submit form automatically
        searchInput.val($(this).text());
        $(this).closest('form').submit(); 
        
        e.preventDefault();
    });
});