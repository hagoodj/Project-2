var db = require('../models');

module.exports = function(app) {

  // Get back all movies
  app.get('/api/user/movie', function(req, res) {
    db.Movie.findAll({}).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // Get back specific movie belonging to a specifi user. 
  app.get('/api/user/:id/movie/:movie_Id', function(req, res) {
    db.Movie.findOne({
      where: {
        title: req.params.title,
        foreignKey: req.params.foreignKey,
        include: [db.User] // <-- where to do I specify user?
      },
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // Post a new movie from specific user. 
  app.post('/api/movie', function(req, res) {
    db.Movie.create(
      req.body, {
        id: req.body.id,
        title: req.body.title,
        genre: req.body.genre,
        include: [db.User]
      },
    ).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // Post a new movie from specific user. 
  app.post('/api/movie', function(req, res) {
    db.Movie.create(
      req.body, {
        id: req.body.id,
        title: req.body.title,
        genre: req.body.genre,
        include: [db.User]
      },
    ).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // Adds a new movie. 
  app.put('/api/movie/:id', function(req, res) {
    // --> check with team. s/b same as above?
  });

  // Deletes movie frok a specific user.
  app.delete('/api/movie/:id', function(req, res) {
    db.Movie.destroy({
      where: {
        title: req.params.title,
        foreignKey: req.params.foreignKey
      }
    }).then(function(dbMovie) {
      res.json(dbMovie)
    });
  });
}