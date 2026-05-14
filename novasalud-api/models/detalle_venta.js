const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Venta = require('./venta');
const Producto = require('./producto');

const DetalleVenta = sequelize.define('detalle_venta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  venta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Venta,
      key: 'id'
    }
  },
  producto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
}, {
  tableName: 'detalle_venta',
  timestamps: true
});

DetalleVenta.belongsTo(Venta, { foreignKey: 'venta_id' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });

module.exports = DetalleVenta;