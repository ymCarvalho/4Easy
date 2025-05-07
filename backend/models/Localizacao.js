const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Localizacao = sequelize.define(
  "Localizacao",
  {
    localizacaoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    endereco: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(100),
    },
    estado: {
      type: DataTypes.STRING(2),
    },
    cep: {
      type: DataTypes.STRING(10),
    },
    complemento: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
  },
  {
    tableName: "Localizacao",
    timestamps: true,
  }
);

module.exports = Localizacao;
