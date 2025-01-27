const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

const app = express();
const PORT = 3001;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000',  // Permitir solicitudes solo desde localhost:3000
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir headers específicos como Authorization
};

app.use(cors(corsOptions)); // Usar las opciones de CORS
app.use(express.json());  // Para que Express pueda parsear los JSON recibidos

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdcontraloria',
};

// Crear conexión a la base de datos
const db = mysql.createConnection(dbConfig);

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);
  }
  console.log('Conexión exitosa con la base de datos.');
});

// Función para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token de la cabecera Authorization

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Usamos la clave secreta desde las variables de entorno
    if (err) {
      return res.status(401).json({ success: false, message: 'Token no válido o expirado.' });
    }

    req.user = decoded; // Guardar los datos del usuario decodificados
    next(); // Continuar con la ejecución de la ruta
  });
};

// Ruta para verificar que el servidor está funcionando y conectado a la base de datos
app.get('/', (req, res) => {
  res.send('El servidor está en funcionamiento y conectado a la base de datos.');
});

// Ruta para el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error del servidor.' });
    }

    if (results.length > 0) {
      const user = results[0];
      
      // Generar el token JWT con los datos del usuario
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ success: true, token, nombre: user.nombre });
    } else {
      res.json({ success: false, message: 'Usuario y/o contraseña incorrectos.' });
    }
  });
});

// Ruta para actualizar el perfil del usuario
app.post('/profile', verifyToken, (req, res) => {
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

// Ruta para obtener el perfil del usuario (protegida por el token)
app.get('/profile', verifyToken, (req, res) => {
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

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor.' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
