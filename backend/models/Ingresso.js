const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ingresso = sequelize.define(
  "Ingresso",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Eventos",
        key: "id",
      },
    },
    nome: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    quantidade: {
      type: DataTypes.INTEGER,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
    },
    vendas_ate: {
      type: DataTypes.DATE,
    },
    qrCode: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Ingressos",
    timestamps: true,
  }
);

sequelize.sync();
module.exports = Ingresso;
