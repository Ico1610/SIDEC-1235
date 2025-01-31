const db = require('../config/db'); // Conexión a la base de datos

// Función para verificar la conexión a la base de datos
const checkDbConnection = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT 1', (err, result) => {
      if (err) {
        reject('No se pudo conectar a la base de datos.');
      } else {
        resolve('Base de datos conectada correctamente.');
      }
    });
  });
};

module.exports = { checkDbConnection };
