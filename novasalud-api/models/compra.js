// models/compra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Proveedor = require('./proveedor');
const Usuario = require('./usuario');

const Compra = sequelize.define('compra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  proveedor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedor,
      key: 'id'
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('completada', 'pendiente', 'cancelada'),
    defaultValue: 'completada'
  }
}, {
  tableName: 'compra',
  timestamps: true
});

Compra.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });
Compra.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Compra;