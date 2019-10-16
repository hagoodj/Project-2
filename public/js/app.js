function displayMovieInfo() {
    var movie = $("#movie-input").val();
    var queryURL = "https://www.omdbapi.com/?s=" + movie + "&y=&plot=short&apikey=9e558ee4";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".container-movies").empty();
        // iterate through response array to get movie ids
        for (var i = 0; i < response.Search.length; i++) {
            // use function to get full movie info
            getMovieData(response.Search[i].imdbID);
        }
    });
}

// get full movie info by searching for the movie id
function getMovieData(movieId) {
    var queryURL = "https://www.omdbapi.com/?i=" + movieId + "&y=&plot=short&apikey=9e558ee4"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // use function to fill page
        createMovieElement(response);
    })
}