import React from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate en lugar de useHistory

const LogoutButton = () => {
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Swal.fire({
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    navigate("/login");
  };

  return (
    <button
      className="logout-btn"
      onClick={handleLogout}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
