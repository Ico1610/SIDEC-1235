import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Perfil = () => {
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
      </form>
    </div>
  );
};

export default Perfil;
