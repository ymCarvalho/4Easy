const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Evento = require("./Evento");

const Midia = sequelize.define("Midia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Evento",
      key: "id",
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("capa", "galeria"),
    allowNull: false,
  },
}, {
  tableName: "Midia",
  timestamps: false,
});

Evento.hasMany(Midia, { foreignKey: "eventoId" });
Midia.belongsTo(Evento, { foreignKey: "eventoId" });

module.exports = Midia;
