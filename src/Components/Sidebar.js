import React, { useState } from 'react';
import logo from '../img/logo.jpg';
import '../styles/Sidebar.css';
import {
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
  FaGraduationCap,
  FaChevronDown,
  FaChevronUp,
  FaAngleRight,
  FaAngleLeft,
  FaBook,
} from 'react-icons/fa';

const Sidebar = () => {
  const [sections, setSections] = useState({}); // Controla el estado de las secciones
  const [isCollapsed, setIsCollapsed] = useState(false); // Controla el estado colapsado

  // Función para alternar sección individual
  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section], // Alternar el estado de la sección
    }));
  };

  // Función para alternar colapsado/expandido
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo-container">
        <img className="sidebar-logo" alt="Logo SECOED" src={logo} />
      </div>

      {/* Menú principal */}
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <a href="/main" className="sidebar-link">
            <FaHome className="sidebar-icon" /> {!isCollapsed && 'Inicio'}
          </a>
        </li>

        <div className="sidebar-separator"></div>

        {/* Sección Trámites */}
        <li className="sidebar-item">
          <button
            className="sidebar-link submenu-toggle"
            onClick={() => toggleSection('tramites')}
          >
            <FaFileAlt className="sidebar-icon" /> {!isCollapsed && 'Trámites'}{' '}
            {sections['tramites'] && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {sections['tramites'] && (
            <ul className={`submenu-list submenu-font-size ${isCollapsed ? 'collapsed' : ''}`}>
              <li className="submenu-item">
                <button
                  className="submenu-link submenu-toggle submenu-font-size"
                  onClick={() => toggleSection('denuncia')}
                >
                  <FaPoll className="sidebar-icon" /> {!isCollapsed && 'Denuncia Ciudadana'}{' '}
                  {sections['denuncia'] && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {sections['denuncia'] && (
                  <ul className={`submenu-list submenu-font-size ${isCollapsed ? 'collapsed' : ''}`}>
                    <li className="submenu-item">
                      <a href="/denuncia/opcion1" className="submenu-link submenu-font-size">
                        <FaFileSignature className="sidebar-icon" /> {!isCollapsed && 'Captura'}
                      </a>
                    </li>
                    <li className="submenu-item">
                      <a href="/denuncia/opcion2" className="submenu-link submenu-font-size">
                        <FaClipboardCheck className="sidebar-icon" /> {!isCollapsed && 'Control Denuncias'}
                      </a>
                    </li>
                    <li className="submenu-item">
                      <a href="/denuncia/opcion3" className="submenu-link submenu-font-size">
                        <FaChartBar className="sidebar-icon" /> {!isCollapsed && 'Estadísticas'}
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="submenu-item">
                <button
                  className="submenu-link submenu-toggle submenu-font-size"
                  onClick={() => toggleSection('encuestas')}
                >
                  <FaPoll className="sidebar-icon" /> {!isCollapsed && 'Encuestas de Opción'}{' '}
                  {sections['encuestas'] && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {sections['encuestas'] && (
                  <ul className={`submenu-list submenu-font-size ${isCollapsed ? 'collapsed' : ''}`}>
                    <li className="submenu-item">
                      <a href="/encuestas/opcion1" className="submenu-link submenu-font-size">
                        <FaBuilding className="sidebar-icon" /> {!isCollapsed && 'Servicios Generales'}
                      </a>
                    </li>
                    <li className="submenu-item">
                      <a href="/encuestas/opcion2" className="submenu-link submenu-font-size">
                        <FaHeartbeat className="sidebar-icon" /> {!isCollapsed && 'Servicios de Salud'}
                      </a>
                    </li>
                    <li className="submenu-item">
                      <a href="/encuestas/opcion3" className="submenu-link submenu-font-size">
                        <FaGraduationCap className="sidebar-icon" /> {!isCollapsed && 'Servicios de Educación'}
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="submenu-item">
                <button
                  className="submenu-link submenu-toggle submenu-font-size"
                  onClick={() => toggleSection('buzones')}
                >
                  <FaPoll className="sidebar-icon" /> {!isCollapsed && 'Control de Buzones'}{' '}
                  {sections['buzones'] && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {sections['buzones'] && (
                  <ul className={`submenu-list submenu-font-size ${isCollapsed ? 'collapsed' : ''}`}>
                    <li className="submenu-item">
                      <a href="/buzones/opcion1" className="submenu-link submenu-font-size">
                        <FaFileSignature className="sidebar-icon" /> {!isCollapsed && 'Captura'}
                      </a>
                    </li>
                    <li className="submenu-item">
                      <a href="/buzones/opcion2" className="submenu-link submenu-font-size">
                        <FaClipboardCheck className="sidebar-icon" /> {!isCollapsed && 'Control de Buzones'}
                      </a>
                    </li>
                    <li className="submenu-item">
                      <a href="/buzones/opcion3" className="submenu-link submenu-font-size">
                        <FaChartBar className="sidebar-icon" /> {!isCollapsed && 'Estadísticas'}
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        <div className="sidebar-separator"></div>

        {/* Sección de Ajustes */}
        <li className="sidebar-item">
          <button
            className="sidebar-link submenu-toggle"
            onClick={() => toggleSection('ajustes')}
          >
            <FaCog className="sidebar-icon" /> {!isCollapsed && 'Ajustes'}{' '}
            {sections['ajustes'] && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {sections['ajustes'] && (
            <ul className={`submenu-list ${isCollapsed ? 'collapsed' : ''}`}>
              <li className="submenu-item">
                <a href="/nuevousuario" className="submenu-link">
                  <FaUserPlus className="sidebar-icon" /> {!isCollapsed && 'Nuevo Usuario'}
                </a>
              </li>
              <li className="submenu-item">
                <a href="/advanced/option2" className="submenu-link">
                  <FaUsersCog className="sidebar-icon" /> {!isCollapsed && 'Mantto. Usuarios'}
                </a>
              </li>
              <li className="submenu-item">
                <a href="/advanced/option3" className="submenu-link">
                  <FaFolderPlus className="sidebar-icon" /> {!isCollapsed && 'Nuevo Módulo'}
                </a>
              </li>
              <li className="submenu-item">
                <a href="/advanced/option4" className="submenu-link">
                  <FaTools className="sidebar-icon" /> {!isCollapsed && 'Mantto. Módulo'}
                </a>
              </li>
            </ul>
          )}
        </li>

        <div className="sidebar-separator"></div>

        {/* Sección Manuales */}
        <li className="sidebar-item">
          <a href="/manuales" className="sidebar-link">
            <FaBook className="sidebar-icon" /> {!isCollapsed && 'Manuales'}
          </a>
        </li>

        <div className="sidebar-separator"></div>

        {/* Sección Perfil de Usuario */}
        <li className="sidebar-item">
          <a href="/perfil" className="sidebar-link">
            <FaUser className="sidebar-icon" /> {!isCollapsed && 'Perfil'}
          </a>
        </li>
      </ul>

      <div className="sidebar-separator"></div>
      
      <button onClick={toggleCollapse} className="collapse-btn">
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
    </button>
    </div>
  );
};

export default Sidebar;
