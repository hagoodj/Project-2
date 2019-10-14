module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    tableName: 'users',
    freezeTableName: true,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
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
    }
  });

  User.associate = function(models) {
    User.belongs(models.Movie, {
      onDelete: "cascade"
    });
  };

  return User;
};