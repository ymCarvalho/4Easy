const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Localizacao = require("./Localizacao");

const Evento = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NomeEvento: {
      type: DataTypes.STRING(50),
    },
    DescEvento: {
      type: DataTypes.STRING(500),
    },
    TipoEvento: {
      type: DataTypes.STRING(20),
    },
    PrivacidadeEvento: {
      type: DataTypes.STRING(20),
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
    },
    horaInicio: {
      type: DataTypes.TIME,
    },
    dataFim: {
      type: DataTypes.DATEONLY,
    },
    horaFim: {
      type: DataTypes.TIME,
    },
    localizacaoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Localizacao",
        key: "id",
      },
    },
  },
  {
    tableName: "Evento",
    timestamps: false,
  }
);
Evento.belongsTo(Localizacao, { foreignKey: "localizacaoId" });

sequelize.sync();
module.exports = Evento;
