// models/proveedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Proveedor = sequelize.define('proveedor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contacto: {
    type: DataTypes.STRING(100)
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(100)
  },
  direccion: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
}, {
  tableName: 'proveedor',
  timestamps: true
});

module.exports = Proveedor;