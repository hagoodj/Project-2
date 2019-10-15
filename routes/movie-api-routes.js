var db = require('../models');

module.exports = function (app) {

  app.get("/api/movies", function (req, res) {

    db.Movie.findAll({}).then(function (dbMovie) {
      res.json(dbMovie);
    });

  });

  app.post("/api/movies", function (req, res) {

    db.Movie.create(req.body).then(function (dbMovie) {
      res.json(dbMovie);
    });

  });

  app.get("/wishlist/:userid/movies", function(req,res) {
    console.log("getting users movies")
    db.userMovie.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(user => {
      console.log("found users movies")
      console.log(user)
      res.json(user)
    })

  })

}