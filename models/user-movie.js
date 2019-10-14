module.exports = function(sequelize, DataTypes) {

  var userMovie = sequelize.define('userMovie', {
    tableName: 'user_movie',
    freezeTableName: true,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    userpin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
        len: [4, 6]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
      }
    }
  });

  // ---- Do I need to add associations here ?? ----

  return userMovie;
};