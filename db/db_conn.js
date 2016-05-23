var Sequelize = require('sequelize');

var sequelize = new Sequelize('mydb', null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: './db/development.sqlite'
});

module.exports = sequelize;