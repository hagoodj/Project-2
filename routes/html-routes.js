var path = require("path");

module.exports = function(app) {

  // index route loads user.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  // wishlist route loads wishlist.html
  app.get("/wishlist/:userid", function(req, res) {
    console.log("serving wishlist html")
    var userid = req.params.userid
    res.sendFile(path.join(__dirname, "../public/wishlist.html"));
  });

};