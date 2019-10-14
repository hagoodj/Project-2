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
        isLowercase: true, // <-- double check this with Jerome/TA's
        isUppercase: true, // <-- double check this with Jerome/TA's
      },
      validate: {
        notNull: true,
        isLowercase: true, // <-- double check this with Jerome/TA's
        isUppercase: true, // <-- double check this with Jerome/TA's
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isLowercase: true, // <-- double check this with Jerome/TA's
        isUppercase: true, // <-- double check this with Jerome/TA's
      }
    }
  });

  Movie.associate = function(models) {
    Movie.hasMany(models.User, { // <-- double check this with Jerome/TA's.
      onDelete: "cascade"
    });
    Movie.belongsTo(models.User, { // <-- do I also need userpin?
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Movie;
};