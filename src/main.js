import React from 'react';
import Sidebar from './Components/Sidebar';

const Main = () => {
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <Sidebar /> {/* Aquí agregamos el Sidebar */}
      </div>
      <div className="main-content-container">
        <h1>Bienvenido al sistema</h1>
        <p>Este es el contenido principal de la aplicación.</p>
        {/* Aquí puedes agregar más contenido según lo necesites */}
      </div>
    </div>
  );
};

export default Main;
