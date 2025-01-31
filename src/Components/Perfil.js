import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/perfilUsuario.module.css"; 
import Sidebar from "../Components/Sidebar";

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          Swal.fire("Error", "No se pudo cargar el perfil", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un problema con la conexión", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePassword = (e) => {
    setChangePassword(e.target.value === "SI");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userData.nombre || !userData.correo || !userData.telefono) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }
    try {
      const updatedData = {
        ...userData,
        password: changePassword ? password : "",
      };
      const response = await axios.put("http://localhost:3001/api/perfil/update", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al actualizar el perfil", "error");
    }
  };

  if (isLoading) return <div className="perfil-loading">Cargando...</div>;

  return (
    <div className="perfil-container">
      <Sidebar />
      <h1>Perfil de Usuario</h1>
      <div className="perfil-logo">
        <img src="./img/user_logo.png" alt="User" className="perfil-logo-img" />
      </div>
      <form onSubmit={handleUpdate}>
        <div className="perfil-form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} className="perfil-input" required />
        </div>
        <div className="perfil-form-group">
          <label>Correo</label>
          <input type="email" name="correo" value={userData.correo} onChange={handleChange} className="perfil-input" required />
        </div>
        <div className="perfil-form-group">
          <label>Teléfono</label>
          <input type="text" name="telefono" value={userData.telefono} onChange={handleChange} className="perfil-input" required />
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
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="perfil-input" required />
          </div>
        )}
        <button type="submit" className="perfil-btn perfil-btn-primary">Actualizar Perfil</button>
        <button type="button" className="perfil-btn perfil-btn-secondary" onClick={() => navigate(-1)}>Regresar</button>
      </form>
    </div>
  );
};

export default PerfilUsuario;
