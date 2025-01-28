import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Visibilidad de contraseña
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
      // Si ya tiene un token, redirige directamente al main sin mostrar la alerta
      window.location.href = '/main';
    } else if (!isLoggedIn) {
      // Mostrar la alerta de bienvenida solo si no está autenticado
      Swal.fire({
        title: 'BIENVENIDO',
        text: 'Por favor, inicie sesión para continuar.',
        icon: 'info',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Almacenar el token JWT en localStorage
        localStorage.setItem('token', data.token);

        setIsLoggedIn(true); // Cambiar estado a "iniciado sesión"

        Swal.fire({
          title: 'Bienvenido',
          text: 'Sistema Integral de Denuncias Ciudadana (SIDEC)',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          imageUrl: 'https://contraloria.durango.gob.mx/wp-content/uploads/2022/11/SECOED.svg',
          imageWidth: 450,
          imageHeight: 130,
          imageAlt: 'Logo SECOED',
        });

        // Redirigir al usuario después del éxito
        setTimeout(() => {
          window.location.href = '/main';
        }, 2000); // Espera para asegurar que se vea la alerta
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Usuario y/o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Ocurrió un problema: ${error.message}`,
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <img
          src="https://contraloria.durango.gob.mx/wp-content/uploads/2022/11/SECOED.svg"
          alt="Logo SECOED"
        />
        <h1>Sistema Integral de Denuncias Ciudadana</h1>
        {isLoggedIn ? (
          <h2>Bienvenido, {username}!</h2>
        ) : (
          <form onSubmit={handleLogin}>
            <label className="form-label" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️‍🗨️' : '🙈'}
              </button>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>
        )}
        <hr />
        <div className="text-center">
          <a href="http://contraloria.durango.gob.mx/" target="_blank" rel="noopener noreferrer">
            &copy; SECOED 2022 - {new Date().getFullYear()}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
