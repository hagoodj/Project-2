module.exports = function(sequelize, DataTypes) {

  var Movie = sequelize.define('Movie', {
    tableName: 'movies',
    freezeTableName: true,
    id: {
      type: DataTypes.INTERGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
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

    Movie.belongsTo(models.User, {
      through: {
        // : 
      }
    });
  };

  return Movie;
};