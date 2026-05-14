const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./producto');

const AlertaStock = sequelize.define('alerta_stock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id'
    }
  },
  tipo_alerta: {
    type: DataTypes.ENUM('bajo_stock', 'sin_stock', 'por_vencer'),
    allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('nueva', 'vista', 'resuelta'),
    defaultValue: 'nueva'
  }
}, {
  tableName: 'alerta_stock',
  timestamps: true
});

AlertaStock.belongsTo(Producto, { foreignKey: 'producto_id' });

module.exports = AlertaStock;