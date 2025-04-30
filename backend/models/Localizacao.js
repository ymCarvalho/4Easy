const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Localizacao = sequelize.define(
  "Localizacao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeLocal: {
      type: DataTypes.STRING,
    },
    rua: {
      type: DataTypes.STRING,
    },
    numero: {
      type: DataTypes.STRING,
    },
    complemento: {
      type: DataTypes.STRING,
    },
    bairro: {
      type: DataTypes.STRING,
    },
    cidade: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
    },
    cep: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
    },
  },
  {
    tableName: "Localizacao",
    timestamps: false,
  }
);
sequelize.sync();
module.exports = Localizacao;
