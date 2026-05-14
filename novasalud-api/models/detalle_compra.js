const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Compra = require('./compra');
const Producto = require('./producto');

const DetalleCompra = sequelize.define('detalle_compra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  compra_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Compra,
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
  tableName: 'detalle_compra',
  timestamps: true
});

DetalleCompra.belongsTo(Compra, { foreignKey: 'compra_id' });
DetalleCompra.belongsTo(Producto, { foreignKey: 'producto_id' });

module.exports = DetalleCompra;