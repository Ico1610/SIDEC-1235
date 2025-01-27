import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Obtener el token de localStorage

        // Si no hay token, redirigir al login
        if (!token) {
          Swal.fire({
            title: "Error",
            text: "No estás autenticado. Inicia sesión.",
            icon: "error",
          });
          window.location.href = "/login"; // Redirigir al login si no está autenticado
          return;
        }

        // Solicitar datos del perfil con el token en el encabezado
        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Autorización con el token
          },
        });

        // Verificar si la respuesta es exitosa
        if (response.data.success) {
          setUserData(response.data.user); // Cargar datos del perfil
        } else {
          setError(response.data.message || "Error al obtener los datos del perfil.");
        }
      } catch (err) {
        setError("Error al obtener los datos del perfil.");
      } finally {
        setLoading(false); // Detener el cargado
      }
    };

    fetchUserData();
  }, []); // Ejecutar solo una vez al montar el componente

  const handleChangePassword = (e) => {
    setChangePassword(e.target.value === "SI"); // Cambiar el estado si el usuario quiere cambiar la contraseña
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value, // Actualizar los campos del perfil
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Preparar los datos a enviar (incluir la contraseña solo si el usuario la está cambiando)
    const updatedData = {
      id: userData.id,
      nombre: userData.nombre,
      correo: userData.correo,
      telefono: userData.telefono,
      password: changePassword ? password : "", // Solo se incluye si se cambia la contraseña
    };

    try {
      const token = localStorage.getItem("authToken"); // Obtener el token de localStorage
      if (!token) {
        throw new Error("No estás autenticado.");
      }

      const response = await axios.post("http://localhost:3001/profile", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
        },
      });

      if (response.data.success) {
        Swal.fire({
          title: "Perfil actualizado",
          icon: "success",
        }).then(() => {
          window.location.href = "/main"; // Redirigir al usuario a la página principal
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el perfil.",
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "Hubo un problema al actualizar el perfil.",
        icon: "error",
      });
    }
  };

  if (loading) return <div>Cargando...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page">
      <h1>Perfil de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="form-control"
            disabled
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
          <label>¿Desea cambiar la contraseña?</label>
          <div>
            <input
              type="radio"
              name="cambiar_password"
              value="SI"
              onChange={handleChangePassword}
            />{" "}
            Sí
            <input
              type="radio"
              name="cambiar_password"
              value="NO"
              onChange={handleChangePassword}
              defaultChecked
            />{" "}
            No
          </div>
        </div>

        {changePassword && (
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required={changePassword}
            />
          </div>
        )}

        <button type="submit" className="btn btn-warning">
          Actualizar Perfil
        </button>
      </form>
    </div>
  );
};

export default Perfil;
