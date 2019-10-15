$(document).ready(function () {

    var newusernameInput = $("#newusername");
    var newuserpinInput = $("#newuserpin");

    $(document).on("submit", "#createUser", createUser);

    getUsers();

    function createUser(event) {
        event.preventDefault();
        if (!newusernameInput.val().trim() || !newuserpinInput.val().trim()) {
            return;
        }
        newUser({
            username: newusernameInput.val().trim(),
            userpin: newuserpinInput.val().trim()
        });
    }

    function newUser(userData) {
        console.log(userData)
        $.post("/api/users", userData)
            .then(getUsers);
    }

    function getUsers() {
        $.get("/api/users", function (data) {
            newusernameInput.val("");
            newuserpinInput.val("");
        });
    }

    // *******************Find User*******************

    var findusername = $("#findusername");
    var finduserpin = $("#finduserpin");
    var uniqueUserId;

    $(document).on("submit", "#findUser", findUser);

    function findUser() {
        event.preventDefault();
        location.assign('/wishlist');
        query = "/api/" + findusername.val() + "/" + finduserpin.val();
        console.log(query);
        $.get(query, function (data) {
            console.log(data.id)
            uniqueUserId = data.id;
            console.log("getusermovie")
        }).then(getUserMovies(uniqueUserId))
    }

    function getUserMovies(userMovieId) {
        console.log("getUserMovies")
        $.get("/api/" + userMovieId + "/movies", function (data) {
            if (!data) {
                $("#addMovieForm").append('<form id="addMovie"><div class="form-group"><input placeholder="Add Movie" type="text" id="addmovie"><button type="submit" class="btn" data-id = ' + userMovieId + '>+</button></div></form>')
            } else {
                for (i = 0; i < data.length; i++) {
                    $("#wishlist").append("<li>" + data[i] + "</li>")
                    $("#addMovieForm").append('<form id="addMovie"><div class="form-group"><input placeholder="Add Movie" type="text" id="addmovie"><button type="submit" class="btn" data-id = ' + userMovieId + '>+</button></div></form>')
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

});
