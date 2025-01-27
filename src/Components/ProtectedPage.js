import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProtectedPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Mostrar el token en la consola
    const token = localStorage.getItem("authToken");
    console.log("Token en la página protegida:", token); // Esto debería mostrar el token

    if (!token) {
      Swal.fire({
        title: "Error",
        text: "No estás autenticado. Inicia sesión.",
        icon: "error",
      });
      window.location.href = "/login"; // Redirigir al login si no hay token
      return;
    }

    const fetchProtectedData = async () => {
      try {
        const response = await fetch("http://mi-backend.com/api/protected-resource", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Incluir el token en los headers
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo acceder al recurso protegido.");
        }

        const responseData = await response.json();
        setData(responseData); // Guardar los datos protegidos
      } catch (error) {
        setError(error.message);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al obtener los datos.",
          icon: "error",
        });
      }
    };

    fetchProtectedData();
  }, []); // El useEffect se ejecuta solo una vez, cuando el componente se monta

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Datos Protegidos</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedPage;
