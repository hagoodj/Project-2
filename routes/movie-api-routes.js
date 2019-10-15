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

  app.get("api/:usermovieid/movies", function(req,res) {

    db.userMovie.findAll({
      where: {
        UserId: req.params.usermovieid
      }
    })
    
  })

}