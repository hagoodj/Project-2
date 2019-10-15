  
module.exports = function(sequelize, DataTypes) {

  var Movie = sequelize.define('Movie', {

    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Movie.associate = function(models) {

    Movie.belongsToMany(models.User, {
      through: {
        model: models.userMovie
      }
    });
  };

  return Movie;
};