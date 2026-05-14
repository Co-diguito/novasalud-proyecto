// middleware/autenticacion.js
const jwt = require('jsonwebtoken');

const autenticacion = (req, res, next) => {
  const token = req.headers.authorization?.split(' ');

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};

const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tiene permisos' });
    }
    next();
  };
};

module.exports = { autenticacion, verificarRol };