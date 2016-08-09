// VARIABLES ========================================================

// General variables
$gifsView = $('#gifsView');

// Initial array of gifs
var gifs = ['Super Mario World', 'Turtles in Time', 'The Legend of Zelda', 'Kirby', 'Donkey Kong', 'Super Punch Out', 'Sonic the Hedgehog'];

// FUNCTIONS ========================================================

// Re-renders the HTML to display the appropriate content.
function displayGifs() {
    $('#gifsView').empty();
    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=30";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        var results = response.data;
        gifsView = $('#gifsView');

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="col-sm-2 col-md-2 col-lg-2 gif">')
            // var rating = results[i].rating;
            // var p = $('<p>').text("Rating: " + rating);
            var gifImage = $('<img>');
            gifImage.attr('src', results[i].images.fixed_height.url);

            // gifDiv.append(p)
            gifDiv.append(gifImage)

            $('#gifsView').append(gifDiv);
        }
    });
}

// Generic function for displaying gif data
function renderButtons() {
    $('#buttonsView').empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
        // Then dynamicaly generate buttons for each gif in the array
        var a = $('<button>');
        a.addClass('btn btn-sm btn-default btn-gif');
        a.attr('data-name', gifs[i]);
        a.text(gifs[i]);
        $('#buttonsView').append(a);
    }
}

// PROCESSES ========================================================

// Add new button via input
$('#addGif').on('click', function() {
    var gif = $('#gif-input').val().trim();
    gifs.push(gif);
    renderButtons();
    return false;
})

// Display the GIFs
$(document).on('click', '.btn-gif', displayGifs);

renderButtons();
