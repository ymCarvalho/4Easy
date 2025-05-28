const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Localizacao = require("./Localizacao");
const Organizador = require("./Organizador");

const Evento = sequelize.define(
  "Evento",
  {
    eventoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    localizacaoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Localizacao",
        key: "localizacaoId",
      },
    },
    organizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organizador",
        key: "organizadorId",
      },
    },
    NomeEvento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    DescEvento: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    TipoEvento: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Outro",
    },
    PrivacidadeEvento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Público",
    },
    DataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    HoraInicio: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    DataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    HoraFim: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: "Evento",
    timestamps: true,
  }
);

Evento.belongsTo(Localizacao, {
  foreignKey: {
    name: "localizacaoId",
  },
});
Localizacao.hasMany(Evento, {
  foreignKey: "localizacaoId",
});

Evento.belongsTo(Organizador, { foreignKey: "organizadorId" });

module.exports = Evento;
