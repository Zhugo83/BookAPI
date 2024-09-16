const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const book = sequelize.define('book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    publishedYear: {
        type: DataTypes.INTEGER,
    }
});

module.exports = book;