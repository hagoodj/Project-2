module.exports = function(sequelize, DataTypes) {
    var userMovie = sequelize.define("userMovie", {
        like: {
            type: DataTypes.BOOLEAN
        }
    })
    return userMovie
};