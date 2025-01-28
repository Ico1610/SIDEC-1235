import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // Función para obtener los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken"); // Obtener el token de localStorage

      if (!token) {
        Swal.fire({
          title: "Error",
          text: "No estás autenticado. Inicia sesión.",
          icon: "error",
        });
        navigate("/login"); // Redirigir al login si no hay token
        return;
      }

      try {
        // Solicitar datos del perfil con el token en el encabezado
        const response = await axios.get("http://localhost:3001/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserData(response.data.user); // Cargar los datos del perfil
        } else {
          throw new Error(response.data.message || "Error al obtener los datos del perfil.");
        }
      } catch (err) {
        console.error("Error al obtener los datos del perfil:", err); // Log para depuración
        setError(err.response?.data?.message || "Hubo un problema al obtener los datos del perfil.");
      } finally {
        setLoading(false); // Detener la carga
      }
    };

    fetchUserData();
  }, [navigate]);

  // Maneja el clic del botón "Regresar"
  const handleGoBack = () => {
    navigate("/main"); // Redirige a la página principal
  };

  // Maneja el cambio de la contraseña
  const handleChangePassword = (e) => {
    setChangePassword(e.target.value === "SI");
  };

  // Maneja el cambio de los datos del perfil
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!userData.nombre || !userData.correo || !userData.telefono) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
      });
      return;
    }

    // Preparar los datos a enviar (incluye la contraseña solo si el usuario la está cambiando)
    const updatedData = {
      id: userData.id,
      nombre: userData.nombre,
      correo: userData.correo,
      telefono: userData.telefono,
      password: changePassword ? password : "", // Solo incluir la contraseña si se va a cambiar
    };

    try {
      const token = localStorage.getItem("authToken"); // Obtener el token de localStorage
      if (!token) {
        throw new Error("No estás autenticado.");
      }

      const response = await axios.post("http://localhost:3001/perfil", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Swal.fire({
          title: "Perfil actualizado",
          icon: "success",
        }).then(() => {
          navigate("/main"); // Redirigir a la página principal después de actualizar
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el perfil.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err); // Log para depuración
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Hubo un problema al actualizar el perfil.",
        icon: "error",
      });
    }
  };

  // Si está cargando o hubo un error
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

        <button type="submit" className="btn btn-warning" disabled={loading}>
          {loading ? "Cargando..." : "Actualizar Perfil"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
        Regresar
      </button>
      </form>
    </div>
  );
};

export default Perfil;
