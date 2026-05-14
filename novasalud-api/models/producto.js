const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoria');

const Producto = sequelize.define('producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo_barras: {
    type: DataTypes.STRING(50),
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id'
    }
  },
  precio_compra: {
    type: DataTypes.DECIMAL(10, 2)
  },
  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock_actual: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  lote: {
    type: DataTypes.STRING(50)
  },
  fecha_vencimiento: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
}, {
  tableName: 'producto',
  timestamps: true
});

Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

module.exports = Producto;