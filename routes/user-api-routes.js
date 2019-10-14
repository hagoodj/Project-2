var db = require('../models');

module.exports = function(app) {

  app.get("/api/users", function (req, res) {

    db.User.findAll({}).then(function (results) {
      res.json(results);
    });

  });
  
  app.get("/api/:username/:userpin", function (req, res) {

    db.User.findOne({
      where: {
        username: req.params.username,
        userpin: req.params.userpin
      }
    }).then(function (results) {
      res.json(results);
    });

  });
  
  app.post("/api/newuser", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  
}