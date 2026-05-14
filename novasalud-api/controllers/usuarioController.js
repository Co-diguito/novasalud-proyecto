// controllers/usuarioController.js
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registrar = async (req, res) => {
  try {
    const { username, password, nombre, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { username } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const nuevoUsuario = await Usuario.create({
      username,
      password,
      nombre,
      rol
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        username: nuevoUsuario.username,
        nombre: nuevoUsuario.nombre,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValido = await usuario.validarPassword(password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en login', error: error.message });
  }
};

// Obtener todos los usuarios
exports.obtenerTodos = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { estado: 'activo' },
      attributes: { exclude: ['password'] }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

// Obtener usuario por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message });
  }
};

// Actualizar usuario
exports.actualizar = async (req, res) => {
  try {
    const { nombre, rol } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.update({ nombre, rol });
    res.json({ mensaje: 'Usuario actualizado', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};

// Eliminar usuario (Lógico)
exports.eliminar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.update({ estado: 'inactivo' });
    res.json({ mensaje: 'Usuario eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};