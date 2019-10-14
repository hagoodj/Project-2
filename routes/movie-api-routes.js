var db = require('../models');

module.exports = function (app) {

  app.get("/api/movies", function (req, res) {

    db.Movie.findAll({}).then(function (results) {
      res.json(results);
    });

  });

  app.get("/api/:username/:userpin/movies", function (req, res) {

    db.userMovie.findAll({
      where: {
        username: req.params.username,
        userpin: req.params.userpin
      }
    }).then(function (results) {
      res.json(results);
    });

  });

  app.post("/api/newmovie", function (req, res) {
    db.Movie.create(req.body).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });

  app.post("/api/newusermovie", function (req, res) {
    db.userMovie.create(req.body).then(function (dbuserMovie) {
      res.json(dbuserMovie);
    });
  });

}