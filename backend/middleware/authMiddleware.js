const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtenemos el token del header

  if (!token) {
    return res.status(403).json({ success: false, message: 'No se proporcionó un token.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido o expirado.' });
    }

    req.user = decoded; // Guardamos los datos decodificados del token en req.user
    next(); // Continuamos con la siguiente ruta
  });
};

module.exports = authMiddleware;
