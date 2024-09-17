const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrpyt = require('bcryptjs');


const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
    const salt = bcrpyt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User;