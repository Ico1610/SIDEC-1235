const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del encabezado

  if (!token) {
    return res.status(401).json({ success: false, message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta');
    req.user = decoded; // Establecer los datos del usuario en req.user
    next(); // Continuar al siguiente middleware o ruta
  } catch (err) {
    return res.status(400).json({ success: false, message: 'Token inválido.' });
  }
};

module.exports = verifyToken;
