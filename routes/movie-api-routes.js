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

  app.get("/api/:movie", function (req, res) {

    db.Movie.findOne({
      where: {
        title: req.params.movie
      }
    }).then(movie => {
      console.log("found movie")
      console.log(movie.dataValues)
      res.json(movie.dataValues);
    });

  });

  app.get("/title/:movieid", function (req, res) {
    console.log("getting movie title")
    db.Movie.findOne({
      where: {
        id: req.params.movieid
      }
    }).then(title => {
      console.log("found movie title")
      console.log(title)
      res.json(title);
    });

  })

  app.get("/wishlist/:userid/movies", function (req, res) {

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

  app.post("/wishlist/:userid/movies", function (req, res) {
    console.log("creating user movie")
    db.userMovie.create(req.body).then(function (dbuserMovie) {
      res.json(dbuserMovie);
    });

  });

  app.delete("/wishlist/:userid/:movieid", function (req, res) {
    db.userMovie.destroy({
      where: {
        UserId: req.params.userid,
        MovieId: req.params.movieid
      }
    }).then(function (dbuserMovie) {
      res.json(dbuserMovie);
    });
  });

  app.put("/wishlist/:userid/:movieid", function (req, res) {
    console.log("updating movie to liked")
    console.log(req.body.like)
    db.userMovie.update({
      like: req.body.like
    }, {
        where: {
          UserId: req.params.userid,
          MovieId: req.params.movieid
        }
      }).then(function (dbuserMovie) {
        res.json(dbuserMovie);
      });
  });

}