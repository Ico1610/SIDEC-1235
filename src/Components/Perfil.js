import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/perfilUsuario.module.css"; // Nombre más específico para evitar conflictos
import Sidebar from "../Components/Sidebar";

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          title: "Error",
          text: "No estás autenticado. Inicia sesión.",
          icon: "error",
        });
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          throw new Error(response.data.message || "Error al obtener los datos del perfil.");
        }
      } catch (err) {
        console.error("Error al obtener los datos del perfil:", err);
        setError(err.response?.data?.message || "Hubo un problema al obtener los datos del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleGoBack = () => navigate("/main");

  const handleChangePassword = (e) => setChangePassword(e.target.value === "SI");

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.nombre || !userData.correo || !userData.telefono) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
      });
      return;
    }

    const updatedData = {
      id: userData.id,
      nombre: userData.nombre,
      correo: userData.correo,
      telefono: userData.telefono,
      password: changePassword ? password : "",
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No estás autenticado.");

      const response = await axios.post("http://localhost:3001/perfil", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        Swal.fire({
          title: "Perfil actualizado",
          icon: "success",
        }).then(() => navigate("/main"));
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el perfil.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Hubo un problema al actualizar el perfil.",
        icon: "error",
      });
    }
  };

  if (loading) return <div className="perfil-loading">Cargando...</div>;
  if (error) return <div className="perfil-error">{error}</div>;

  return (
    <div className="perfil-container">
      <Sidebar />
      <h1>Perfil de Usuario</h1>
      <div className="perfil-logo">
        <img src="./img/user_logo.png" alt="User" className="perfil-logo-img" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="perfil-form-group">
          <label>Usuario</label>
          <input type="text" name="username" value={userData.username} className="perfil-input" disabled />
        </div>
        
        <div className="perfil-form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} className="perfil-input" required />
        </div>

        <div className="perfil-form-group">
          <label>Correo</label>
          <input type="email" name="correo" value={userData.correo} onChange={handleInputChange} className="perfil-input" required />
        </div>

        <div className="perfil-form-group">
          <label>Teléfono</label>
          <input type="text" name="telefono" value={userData.telefono} onChange={handleInputChange} className="perfil-input" required />
        </div>

        <div className="perfil-form-group">
          <label>¿Desea cambiar la contraseña?</label>
          <div>
            <input type="radio" name="cambiar_password" value="SI" onChange={handleChangePassword} /> Sí
            <input type="radio" name="cambiar_password" value="NO" onChange={handleChangePassword} defaultChecked /> No
          </div>
        </div>

        {changePassword && (
          <div className="perfil-form-group">
            <label>Contraseña</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="perfil-input" required={changePassword} />
          </div>
        )}

        <button type="submit" className="perfil-btn perfil-btn-primary">Actualizar Perfil</button>
        <button type="button" className="perfil-btn perfil-btn-secondary" onClick={handleGoBack}>Regresar</button>
      </form>
    </div>
  );
};

export default PerfilUsuario;