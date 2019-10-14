$(function () {
    $("#addMovie").on("submit", function (event) {
        event.preventDefault();

        var movieName = $("#ca").val().trim();
        
        if (movieName.length > 0) {
            var newUserMovie = {
                movie: movieName,
                
            };
        } 

        $.ajax("/api/", {
            type: "POST",
            data: newUserMovie
        }).then(
            function () {
                console.log("created new user movie");
                location.reload();
            }
        );
    });
});