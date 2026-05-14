const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario');

const Venta = sequelize.define('venta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cliente_nombre: {
    type: DataTypes.STRING(100)
  },
  cliente_dni: {
    type: DataTypes.STRING(20)
  },
  cliente_telefono: {
    type: DataTypes.STRING(20)
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
  tableName: 'venta',
  timestamps: true
});

Venta.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Venta;