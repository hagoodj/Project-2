var path = require("path");

module.exports = function(app) {

  // index route loads user.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  // wishlist route loads wishlist.html
  app.get("/wishlist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/wishlist.html"));
  });

};