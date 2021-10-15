//Trazendo o orm
const Sequelize = require('sequelize');

//Conexão com o banco
const db = require('../db/connection');

//Criando o model e definindo os campos com base na nossa tabela
const Job = db.define('job', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  salary: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  new_job:{
    type: Sequelize.INTEGER,
  }
});

//Exportando
module.exports = Job;