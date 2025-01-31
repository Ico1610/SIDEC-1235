import React from 'react';
import Sidebar from './Components/Sidebar'; // Se importa el menu principal 
import LogoutButton from './Components/LogoutButton'; // Se importa el boton cerrar sesion 
import Dashboard from './Components/Dashboard'; // Se importa el archivo Dashboard.js

const Main = () => {
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <Sidebar /> {/* Aquí agregamos el menu principal */}
        
      </div>
      <div className="main-content-container">
        <Dashboard /> {/* Se renderiza el contenido del Dashboard */}
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Main;
