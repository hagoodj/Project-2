//----------Dependencies---------//
var express = require("express");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");



// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


//ROUTES
// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/movie-api-routes.js")(app);



// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });