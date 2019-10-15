module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userpin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [4, 6]
      }
    }
  });

  User.associate = function(models) {

    User.belongsToMany(models.Movie, {
      through: {
        model: models.userMovie
      }
    });
  };

  return User;
};