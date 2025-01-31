const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware'); // Importa el middleware de autenticación
const { checkDbConnection } = require('./utils/dbUtils'); // Función para verificar la conexión a la DB
const db = require('./config/db');
const perfilRoutes = require('./controllers/perfil'); // Importa las rutas del perfil
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = 3001;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Solo permite solicitudes desde el frontend
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Usar CORS
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Middleware para procesar JSON en el cuerpo de la solicitud

// Ruta para verificar el estado de la base de datos
app.get('/', async (req, res) => {
  try {
    const dbStatus = await checkDbConnection();
    res.json({ success: true, message: dbStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al conectar con la base de datos.' });
  }
});

// Ruta de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error del servidor' });

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ success: true, token, nombre: user.nombre });
    }

    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
  });
});

// Middleware para verificar token
app.use('/api/perfil', authMiddleware); // Añadir middleware de autenticación antes de las rutas protegidas

// Rutas del perfil
app.use('/api/perfil', perfilRoutes); // Agrega el prefijo para las rutas del perfil

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
