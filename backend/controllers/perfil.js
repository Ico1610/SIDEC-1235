const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de que esta ruta es correcta
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticación

// ✅ Obtener perfil del usuario autenticado
router.get('/', authMiddleware, (req, res) => {
  const userId = req.user.id; // Se obtiene el ID del usuario desde el token

  const query = 'SELECT id, username, nombre, correo, telefono FROM usuarios WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error del servidor' });
    if (results.length > 0) {
      return res.json({ success: true, user: results[0] });
    }
    res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  });
});
// ✅ Ruta para actualizar perfil con método PUT
router.put('/update', authMiddleware, (req, res) => {
  const { id, nombre, correo, telefono, password } = req.body;
  let query = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ? WHERE id = ?';
  let params = [nombre, correo, telefono, id];

  if (password) {
    query = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, password = ? WHERE id = ?';
    params.push(password);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error al actualizar el perfil' });

    if (results.affectedRows > 0) {
      return res.json({ success: true, message: 'Perfil actualizado correctamente' });
    }

    res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  });
});

module.exports = router;
