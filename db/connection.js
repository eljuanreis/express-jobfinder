const Sequelize = require('sequelize');

//Conexão com o banco mysql
const sequelize = new Sequelize('jobfinder', 'root', 'root', {dialect: 'mysql', host: 'localhost'});

//Exportando o módulo
module.exports = sequelize;