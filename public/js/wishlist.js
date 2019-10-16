$(document).ready(function () {

    console.log(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
    var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    getUserMovies()

    function getUserMovies() {
        console.log("get user movies")
        console.log(userid)
        $.get("/wishlist/" + userid + "/movies", function (res) {
            $("#addMovieButton").attr("data-id", userid)
            $("#likedMovies").empty();
            $("#dislikedMovies").empty();
            console.log(res[0])
            if (!res[0]) {
                return
            } else {
                console.log("get user movies titles for each user movie")
                $("#wishlist").empty();
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

});