$(document).ready(function () {

    console.log(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
    var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    getUserMovies()

    function getUserMovies() {
        console.log("get user movies")
        console.log(userid)
        $.get("/wishlist/" + userid + "/movies", function (res) {
            $("#addMovieButton").attr("data-id", userid)
            console.log(res[0])
            if (!res[0]) {
                return
            } else {
                console.log("get user movies titles for each user movie")
                $("#wishlist").empty();
                $("#likedMovies").empty();
                $("#dislikedMovies").empty();
                for (i = 0; i < res.length; i++) {

                    if (res[i].like === true) {
                        $.get("/title/" + res[i].MovieId, function (result) {
                            $("#likedMovies").append("<li data-userid = " + userid + " data-movieid = " + result.id + ">" + result.title + "</li>")
                            $("#likedMovies").append("<button class = 'delete' data-userid = " + userid + " data-movieid = " + result.id + ">Delete</button>")
                        })
                    } else if (res[i].like === false) {
                        $.get("/title/" + res[i].MovieId, function (result) {
                            $("#dislikedMovies").append("<li data-userid = " + userid + " data-movieid = " + result.id + ">" + result.title + "</li>")
                            $("#dislikedMovies").append("<button class = 'delete' data-userid = " + userid + " data-movieid = " + result.id + ">Delete</button>")
                        })
                    } else {
                        $.get("/title/" + res[i].MovieId, function (result) {
                            $("#wishlist").append("<li data-userid = " + userid + " data-movieid = " + result.id + ">" + result.title + "</li>")
                            $("#wishlist").append("<button class = 'delete' data-userid = " + userid + " data-movieid = " + result.id + ">Delete</button>")
                            $("#wishlist").append("<button class = 'like' data-userid = " + userid + " data-movieid = " + result.id + ">Like</button>")
                            $("#wishlist").append("<button class = 'dislike' data-userid = " + userid + " data-movieid = " + result.id + ">Dislike</button>")

                        })
                    }
                }
            }
        })
    }

    // *******************Movie Buttons*********************************************************

    // ***********Delete***********

    $(document).on("click", ".delete", deleteMovie)

    function deleteMovie() {
        console.log(this)
        var listUserId = $(this).data("userid");
        console.log(listUserId);
        var listMovieId = $(this).data("movieid");
        console.log(listMovieId);
        $.ajax({
            method: "DELETE",
            url: "/wishlist/" + listUserId + "/" + listMovieId
        })
            .then(getUserMovies);
    }

    // ***********Like***********

    $(document).on("click", ".like", likeMovie)

    function likeMovie(data) {
        console.log(this)
        var listUserId = $(this).data("userid");
        console.log(listUserId);
        var listMovieId = $(this).data("movieid");
        console.log(listMovieId);
        var updateLike = {
            like: true
        };
        $.ajax({
            method: "PUT",
            url: "/wishlist/" + listUserId + "/" + listMovieId,
            data: updateLike
        }).then(getUserMovies);
    }

    // ***********Dislike***********

    $(document).on("click", ".dislike", dislikeMovie)

    function dislikeMovie(data) {
        console.log(this)
        var listUserId = $(this).data("userid");
        console.log(listUserId);
        var listMovieId = $(this).data("movieid");
        console.log(listMovieId);
        var updateLike = {
            like: false
        };
        $.ajax({
            method: "PUT",
            url: "/wishlist/" + listUserId + "/" + listMovieId,
            data: updateLike
        }).then(getUserMovies);
    }

    // *******************Add Movie*******************

    var newMovie = $("#addmovie");

    $(document).on("submit", "#addMovie", addMovie);

    getMovies();

    function addMovie(event) {
        console.log("adding movie")
        event.preventDefault();
        if (!newMovie.val().trim()) {
            return;
        }
        createMovie({
            title: newMovie.val().trim(),
        });
    }

    function createMovie(movieData) {
        console.log(movieData)
        $.post("/api/movies", movieData)
            .then(getMovies);
    }

    function getMovies() {
        $.get("/api/movies", function (data) {
            addUserMovie();
            newMovie.val("");
        });
    }

    // *******************Add User Movie*******************

    function addUserMovie() {
        console.log("adding user movie")
        console.log(newMovie.val().trim())
        if (!newMovie.val().trim()) {
            return;
        }
        $.get("/api/" + newMovie.val().trim(), function (res) {
            console.log(res.id);
            createUserMovie({
                UserId: userid,
                MovieId: res.id,
            });
        });
    }

    function createUserMovie(userMovieData) {
        console.log("create user movie");
        console.log(userid);
        $.post("/wishlist/" + userid + "/movies", userMovieData)
            .then(getUserMovies);
    }



    // Andrew's part
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
        // get movie imdbid
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
});