module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    tableName: 'users',
    freezeTableName: true,
    id: {
      type: DataTypes.INTERGER,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isLowercase: true, // <-- double check this with Jerome/TA's
        isUppercase: true, // <-- double check this with Jerome/TA's
      }
    },
    userpin: {
      type: DataTypes.INTERGER,
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
    User.hasMany(models.Movie, {
      onDelete: "cascade"
    });
  };

  return User;
};