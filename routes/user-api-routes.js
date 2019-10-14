var db = require('../models');

module.exports = function(app) {

  // Get all movies on a user's wishlist.  
  app.get('api/user', function(req, res) {
    db.User.findAll({
      where: {
        userpin: req.params.userpin
      },
      include: [db.Movie]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get back a specific user. 
  app.get('/api/user/:id', function(req, res) {
    db.User.findOne({
      where: {
        userpin: req.params.userpin
      },
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get back all movies from a specific User
  app.get('/api/user/:id/movie/', function(req, res) { // <-- double check this (how's it different than # 1?
    db.User.findAll({
      where: {
        userpin: req.params.id
      },
      include: [db.Movie]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get back specific movie belonging to a specifi user. 
  app.get('/api/user/:id/movie/:movie_Id', function(req, res) {
    db.User.findOne({
      where: {
        userpin: req.params.id
      },
      include: [db.Movie] // <-- ask where to reference the foreign key?
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Creating a new user
  app.post('/api/user', function(req, res) {
    db.User.create(
      req.body, {
        id: req.body.id,
        uesrname: req.body.uesrname,
        userpin: req.body.userpin
      },
    ).then(function(dbUser) {
      res.json(dbUser);
    });
  });
}