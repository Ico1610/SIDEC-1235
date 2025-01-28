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
      <Routes> {/* Rutas para funcionalidad de inicio y botones de menús */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

