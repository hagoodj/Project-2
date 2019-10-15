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
        var query = "/api/" + findusername.val() + "/" + finduserpin.val();
        console.log("\nquery")
        console.log(query);
        $.get(query, function (data) {
            console.log(data)
            uniqueUserId = data.id;
            window.location = '/wishlist/' + uniqueUserId;
        })
    }

});
