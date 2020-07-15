const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_nodejs_rest_api','siddique','123456', {
    dialect: 'mysql', 
    host: 'localhost'
});


module.exports = sequelize;