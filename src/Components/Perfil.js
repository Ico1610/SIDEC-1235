import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/perfil.css"; // Importación del archivo CSS
import Sidebar from "../Components/Sidebar"; // Importación del menú principal

const Perfil = () => {
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
      password: changePassword ? password : "", // Solo incluir la contraseña si está cambiando
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

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <Sidebar /> {/* Menú principal */}
      <h1>Perfil de Usuario</h1>
      {/* Agregar logo de usuario aquí */}
      <div className="user-logo">
        <img src="img/user_logo.png" alt="User" className="logo-img" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <input type="text" name="username" value={userData.username} className="form-control" disabled />
        </div>

        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input type="email" name="correo" value={userData.correo} onChange={handleInputChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input type="text" name="telefono" value={userData.telefono} onChange={handleInputChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>¿Desea cambiar la contraseña?</label>
          <div>
            <input type="radio" name="cambiar_password" value="SI" onChange={handleChangePassword} /> Sí
            <input type="radio" name="cambiar_password" value="NO" onChange={handleChangePassword} defaultChecked /> No
          </div>
        </div>

        {changePassword && (
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required={changePassword} />
          </div>
        )}

        <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
        <button type="button" className="btn btn-secondary" onClick={handleGoBack}>Regresar</button>
      </form>
    </div>
  );
};

export default Perfil;
