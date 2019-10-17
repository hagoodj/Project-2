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
//getUserMovies();
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



$("#addToWishlist").on("click", function(event){
    wishlist($(this).data("id"));
    // need to funnel user id into wishlist.js because movie id is handled here
    addUserMovie()
});

// create element to store movie info and append to page
function createMovieElement(response) {
    var resultsFront = $("<div class='movie-inside front'>");
    var resultsBack = $("<div class='movie-inside back'>");
    var movieDetails = $("<div class='movie-details'>");
    var movieBox = $("<div class='movie'>");
    var movieContainer = $("<div class='container-movie'>");
    // var dislike = $("<button class='likeDislike' type='button'>LIKE</button>");
    // var like = $("<button class='likeDislike' type='button'>DISLIKE</button>");

    var addToWishlist = $("<button class='addToWishlist' type='button'>Add to Wishlist</button>");
    addToWishlist.data("id", response.imdbID);

    var poster = response.Poster;
    var posterInput = $("<img class='movie-poster'>").attr("src", poster);
    resultsFront.append(posterInput);

    var title = response.Title;
    var titleInput = $("<h1 class='movie-title'>").text(title);
    movieDetails.append(titleInput);


    var year = response.Year;
    var yearInput = $("<span>").text("Released: " + year);
    movieDetails.append(yearInput);



    var runtime = response.Runtime;
    var runtimeInput = $("<span>").text(" Runtime: " + runtime);
    movieDetails.append(runtimeInput);


    var plot = response.Plot;
    var plotInput = $("<p class='movie-plot'>").text("Plot: " + plot);
    movieDetails.append(plotInput);


    movieBox.append(resultsFront);
    resultsBack.append(movieDetails);
    movieBox.append(resultsBack);


    // movieBox.append($("<br><br><br><br>"));
    // // resultsBack.append($("<br><br><br><br>"));
    // movieDetails.append($("<br><br><br><br>"));

    // resultsBack.append(dislike);
    // resultsBack.append(like);
    resultsBack.append(addToWishlist);

    movieContainer.append(movieBox);

    $(".container-movies").append(movieContainer);
}

$("#add-movie").on("click", function(event){
    event.preventDefault();
    displayMovieInfo();
});