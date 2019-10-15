var db = require('../models');

module.exports = function (app) {

  app.get("/api/users", function (req, res) {

    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });

  });

  app.post("/api/users", function (req, res) {

    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });

  });

  app.get("/api/:username/:userpin", function (req, res) {

    db.User.findOne({
      where: {
        username: req.params.username,
        userpin: req.params.userpin
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });

  });

}