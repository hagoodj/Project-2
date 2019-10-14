  
module.exports = function(sequelize, DataTypes) {

  var Movie = sequelize.define('Movie', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
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