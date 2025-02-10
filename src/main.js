import React from 'react';
import Sidebar from './Components/Sidebar';
//import LogoutButton from './Components/LogoutButton';
//import Dashboard from './Components/Dashboard'; // Importa el archivo Dashboard.js

const Main = () => {
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <Sidebar /> {/* Aquí agregamos el Sidebar */}
      </div>
{/* 
     <div className="main-content-container">
        <Dashboard /> {/* Se renderiza el contenido del Dashboard */}
    {/* </div>
      <div>
        <LogoutButton />
      </div>   */} 
    </div>
  );
};

export default Main;
