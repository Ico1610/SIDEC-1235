import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles//index.css';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import Main from './main'; // Importa tu componente para la ruta '/main'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Ruta para la página de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* Ruta para la página principal (main) */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

