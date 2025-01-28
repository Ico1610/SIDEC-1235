import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaHome, 
  FaFileAlt, 
  FaPoll, 
  FaCog, 
  FaUser, 
  FaTools, 
  FaUserPlus, 
  FaUsersCog, 
  FaFolderPlus,
  FaFileSignature,
  FaClipboardCheck,
  FaChartBar,
  FaBuilding,
  FaHeartbeat,
  FaGraduationCap
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla la barra lateral
  const [submenus, setSubmenus] = useState({}); // Controla el estado de los submenús

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Función para alternar submenú individual
  const toggleSubmenu = (menu) => {
    setSubmenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Alternar el estado del submenú
    }));
  };

  return (
    <div>
      {/* Botón para mostrar/ocultar la barra lateral */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Barra lateral */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img
            src="https://contraloria.durango.gob.mx/wp-content/uploads/2022/11/SECOED.svg"
            alt="Logo SECOED"
            className="sidebar-logo"
          />
          <h1>Sistema Integral</h1>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-item">
            <a href="/main" className="sidebar-link">
              <FaHome className="sidebar-icon" /> Inicio
            </a>
          </li>

          {/* Menú principal */}
          <li className="sidebar-item">
            <button
              className="sidebar-link submenu-toggle"
              onClick={() => toggleSubmenu('principal')}
            >
              <FaFileAlt className="sidebar-icon" /> Principal {submenus['principal'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {submenus['principal'] && (
              <ul className="submenu-list">
                <li className="submenu-item">
                  <button
                    className="submenu-link submenu-toggle"
                    onClick={() => toggleSubmenu('denuncia')}
                  >
                    <FaPoll className="sidebar-icon" /> Denuncia Ciudadana {submenus['denuncia'] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {submenus['denuncia'] && (
                    <ul className="submenu-list">
                      <li className="submenu-item">
                        <a href="/denuncia/opcion1" className="submenu-link">
                          <FaFileSignature className="sidebar-icon" /> Captura
                        </a>
                      </li>
                      <li className="submenu-item">
                        <a href="/denuncia/opcion2" className="submenu-link">
                          <FaClipboardCheck className="sidebar-icon" /> Control Denuncias
                        </a>
                      </li>
                      <li className="submenu-item">
                        <a href="/denuncia/opcion3" className="submenu-link">
                          <FaChartBar className="sidebar-icon" /> Estadisticas
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="submenu-item">
                  <button
                    className="submenu-link submenu-toggle"
                    onClick={() => toggleSubmenu('encuestas')}
                  >
                    <FaPoll className="sidebar-icon" /> Encuestas de Opción {submenus['encuestas'] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {submenus['encuestas'] && (
                    <ul className="submenu-list">
                      <li className="submenu-item">
                        <a href="/encuestas/opcion1" className="submenu-link">
                          <FaBuilding className="sidebar-icon" /> Servicios Generales
                        </a>
                      </li>
                      <li className="submenu-item">
                        <a href="/encuestas/opcion2" className="submenu-link">
                          <FaHeartbeat className="sidebar-icon" /> Servicios de Salud
                        </a>
                      </li>
                      <li className="submenu-item">
                        <a href="/encuestas/opcion3" className="submenu-link">
                          <FaGraduationCap className="sidebar-icon" /> Servicios de educación
                        </a>
                      </li>
                    </ul>
                  )}
                </li>  
                <li className="submenu-item">
                  <button
                    className="submenu-link submenu-toggle"
                    onClick={() => toggleSubmenu('buzones')}
                  >
                    <FaPoll className="sidebar-icon" /> Control de buzones {submenus['buzones'] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {submenus['buzones'] && (
                    <ul className="submenu-list">
                      <li className="submenu-item">
                        <a href="/buzones/opcion1" className="submenu-link">
                          <FaFileSignature className="sidebar-icon" /> Captura
                        </a>
                      </li>
                      <li className="submenu-item">
                        <a href="/buzones/opcion2" className="submenu-link">
                          <FaClipboardCheck className="sidebar-icon" /> Control de Buzones
                        </a>
                      </li>
                      <li className="submenu-item">
                        <a href="/buzones/opcion3" className="submenu-link">
                          <FaChartBar className="sidebar-icon" /> Estadisticas
                        </a>
                      </li>
                    </ul>
                  )}
                </li>     
              </ul>
            )}
          </li>

          {/* Menú de ajustes */}
          <li className="sidebar-item">
            <button
              className="sidebar-link submenu-toggle"
              onClick={() => toggleSubmenu('ajustes')}
            >
              <FaCog className="sidebar-icon" /> Ajustes {submenus['ajustes'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {submenus['ajustes'] && (
              <ul className="submenu-list">
                <li className="submenu-item">
                  <a href="/advanced/option1" className="submenu-link">
                    <FaUserPlus className="sidebar-icon" /> Nuevo Usuario
                  </a>
                </li>
                <li className="submenu-item">
                  <a href="/advanced/option2" className="submenu-link">
                    <FaUsersCog className="sidebar-icon" /> Mantto. Usuarios
                  </a>
                </li>
                <li className="submenu-item">
                  <a href="/advanced/option3" className="submenu-link">
                    <FaFolderPlus className="sidebar-icon" /> Nuevo Módulo
                  </a>
                </li>
                <li className="submenu-item">
                  <a href="/advanced/option4" className="submenu-link">
                    <FaTools className="sidebar-icon" /> Mantto. Módulo
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li className="sidebar-item">
            <a href="/profile" className="sidebar-link">
              <FaUser className="sidebar-icon" /> Perfil
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
