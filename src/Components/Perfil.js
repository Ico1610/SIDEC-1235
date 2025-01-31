<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/perfilUsuario.module.css"; // Nombre más específico para evitar conflictos
import Sidebar from "../Components/Sidebar";
>>>>>>> dc272cb38392026a93421b5cc029c0502e51a966

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("authToken"); // Obtener el token de localStorage

  // Función para obtener los datos del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/perfil', {  // Cambiar a '/api/perfil'
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,  // Usar el token almacenado
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserData(data.user); // Setea los datos del usuario
        } else {
          Swal.fire('Error', 'No se pudo cargar el perfil', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema con la conexión', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchProfile();
  }, [token]);

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para actualizar el perfil
  const handleUpdate = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======

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

>>>>>>> dc272cb38392026a93421b5cc029c0502e51a966
    try {
      const response = await fetch('http://localhost:3001/api/perfil/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pasamos el token como encabezado
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al actualizar el perfil', 'error');
    }
  };

<<<<<<< HEAD
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Actualizar Perfil</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={userData.correo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contraseña (opcional)</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
=======
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
>>>>>>> dc272cb38392026a93421b5cc029c0502e51a966
      </form>
    </div>
  );
};

export default PerfilUsuario;