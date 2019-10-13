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

  Movie.associate = function(models) { // <-- double check this with Jerome/TA's. ALSO ASK ABOUT SYNCING.
    Movie.hasMany(models.User, {
      onDelete: "cascade"
    });

    Movie.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Movie;
};