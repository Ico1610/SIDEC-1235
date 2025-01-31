import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../Components/Sidebar"; // Importación del menú principal

const NuevoUsuario = () => {
  const [userData, setUserData] = useState({
    username: "",
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error] = useState(" ");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.nombre || !userData.correo || !userData.telefono || !password || !confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden.",
        icon: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/usuarios", {
        username: userData.username,
        nombre: userData.nombre,
        correo: userData.correo,
        telefono: userData.telefono,
        password,
      });

      if (response.data.success) {
        Swal.fire({
          title: "Usuario creado",
          icon: "success",
        }).then(() => navigate("/login"));
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el usuario.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error al crear el usuario:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Hubo un problema al crear el usuario.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <Sidebar /> {/* Menú principal */}
      <h1>Crear Nuevo Usuario</h1>
      {/* Agregar logo de usuario aquí */}
      <div className="user-logo">
        <img src="img/user_logo.png" alt="User" className="logo-img" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={userData.correo}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={userData.telefono}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Usuario</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/login")}>Regresar</button>
      </form>
    </div>
  );
};

export default NuevoUsuario;
