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
                for (i = 0; i < res.length; i++) {
                    console.log(res[i].MovieId)
                    $.get("/title/" + res[i].MovieId, function (result) {
                        console.log(result)
                        $("#wishlist").append("<li>" + result.title + "</li>")
                    })
                }
            }
        })
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

});