import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from './Components/Sidebar';
import Perfil from './Components/Perfil';
import ProtectedPage from './ProtectedPage';
import './App.css';

// Componente para proteger las rutas
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dbMessage, setDbMessage] = useState('');
  const navigate = useNavigate();

  // Obtener el estado de la conexión a la base de datos
  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((response) => response.json())
      .then((data) => setDbMessage(data.message))
      .catch((error) => console.error('Error:', error));
  }, []);

  // Manejo del inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error('Error en la solicitud al servidor.');

        const data = await response.json();
        if (data.success) {
          localStorage.setItem('authToken', data.token);
          Swal.fire({
            title: 'Bienvenido',
            text: `Hola, ${data.nombre}`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          navigate('/perfil');
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Usuario y/o contraseña incorrectos.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un problema con el inicio de sesión.',
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    navigate('/login');
  };

  return (
    <Router>
      <div className="App">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="container-fluid">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6 text-center">
                  <img src="https://contraloria.durango.gob.mx/wp-content/uploads/2022/11/SECOED.svg" alt="Logo" width={390} height={600} />
                </div>
                <div className="col-md-6">
                  <div className="card p-4">
                    <h1 className="text-center">SIDEC</h1>
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                          type="text"
                          className="form-control"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-dark w-100">
                        Iniciar sesión
                      </button>
                    </form>
                    <div className="text-center mt-3">
                      <a href="http://contraloria.durango.gob.mx/" target="_blank" rel="noopener noreferrer">
                        &copy; SECOED 2022 - {new Date().getFullYear()}
                      </a>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h5>Database Connection Status</h5>
                    <p>{dbMessage || 'Cargando estado...'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
