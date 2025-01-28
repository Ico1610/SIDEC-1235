const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken'); // Importar el middleware

// Ruta para obtener el perfil del usuario
router.get('/perfil', verifyToken, (req, res) => {
  const userId = req.user.id; // Obtener el id del usuario desde el token

  const query = 'SELECT id, username, nombre, correo, telefono FROM usuarios WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error del servidor.' });
    }

    if (results.length > 0) {
      res.json({ success: true, user: results[0] }); // Devolver la información del usuario
    } else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
  });
});

// Ruta para actualizar el perfil (opcional, si la necesitas)
router.post('/perfil', verifyToken, (req, res) => {
  const { id, nombre, correo, telefono, password } = req.body;
  
  let query = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ? WHERE id = ?';
  let params = [nombre, correo, telefono, id];

  if (password) {
    query = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, password = ? WHERE id = ?';
    params.push(password);  // Si se proporciona una nueva contraseña
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error del servidor.' });
    }

    if (results.affectedRows > 0) {
      res.json({ success: true, message: 'Perfil actualizado correctamente.' });
    } else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
  });
});

module.exports = router;
