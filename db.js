const Sequelize = require('sequelize');
const database = new Sequelize('postgres://postgres:vemapusar123@127.0.0.1:5432/nodejs');

module.exports = database;