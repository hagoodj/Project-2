$(document).ready(function () {

    console.log("window location" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
    var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    getUserMovies()

    function getUserMovies() {
        console.log(userid)
        $.get("/wishlist/" + userid + "/movies", function (res) {
            if (!res.data) {
                $("#addMovieForm").append('<form id="addMovie"><div class="form-group"><input placeholder="Add Movie" type="text" id="addmovie"><button type="submit" class="btn" data-id = ' + userid + '>+</button></div></form>')
            } else {
                for (i = 0; i < res.data.length; i++) {
                    $("#wishlist").append("<li>" + data[i] + "</li>")
                    $("#addMovieForm").append('<form id="addMovie"><div class="form-group"><input placeholder="Add Movie" type="text" id="addmovie"><button type="submit" class="btn" data-id = ' + userid + '>+</button></div></form>')
                }
            }
        })
    }

    // *******************Add Movie*******************

    var newMovie = $("#addmovie");

    $(document).on("submit", "#addMovie", addMovie);

    getMovies();

    function addMovie(event) {
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
            newMovie.val("");
        });
    }

    // *******************Add User Movie*******************
    

});