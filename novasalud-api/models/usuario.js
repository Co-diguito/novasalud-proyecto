const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'vendedor', 'encargado_inventario'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      usuario.password = await bcrypt.hash(usuario.password, 10);
    }
  },
  tableName: 'usuario',
  timestamps: true
});

Usuario.prototype.validarPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;