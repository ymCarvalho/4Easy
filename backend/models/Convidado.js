const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Convidado = sequelize.define(
  "Convidado",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "Convidado", tymestamps: false }
);

sequelize.sync();
module.exports = Convidado;
