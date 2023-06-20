const { Sequelize, DataTypes, Model } = require("sequelize");

const dbSequelize = new Sequelize("aluno", "root", "mysql", {
  //lembrse que os parâmetros é de acordo com o banco de dados.
  dialect: "mysql",
  host: "localhost",
});

module.exports = dbSequelize;
