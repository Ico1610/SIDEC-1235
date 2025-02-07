/*nos sirve para poner las rutas del menu*/ 

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles//index.css';
import Login from './login';
import Main from './main';
import Perfil from './Components/Perfil';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes> {/* Rutas para funcionalidad de inicio y botones de menús */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/perfil" element={<Perfil />} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);
