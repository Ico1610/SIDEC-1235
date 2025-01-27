import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const chartData = {
    labels: ["Sanctionadas", "Cerradas", "En Proceso"],
    datasets: [
      {
        label: "Denuncias",
        data: [1, 505, 295],
        backgroundColor: ['#e74c3c', '#3498db', '#f39c12'],
        borderColor: ['#c0392b', '#2980b9', '#f1c40f'],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bienvenido al Tablero</h1>
        <p>Gestión y seguimiento de denuncias.</p>
      </header>
      
      <section className="statistics-container">
        <div className="stat-card">
          <h2>Total de Denuncias</h2>
          <div className="progress-bar" style={{ width: '80%' }}>
            <span>801 Registros</span>
          </div>
        </div>

        <div className="stat-card">
          <h2>Sanctionadas</h2>
          <div className="progress-bar" style={{ width: '0.12%' }}>
            <span>1 registro 0.12 %</span>
          </div>
        </div>

        <div className="stat-card">
          <h2>Cerradas</h2>
          <div className="progress-bar" style={{ width: '63.05%' }}>
            <span>505 registros 63.05 %</span>
          </div>
        </div>

        <div className="stat-card">
          <h2>En Proceso</h2>
          <div className="progress-bar" style={{ width: '36.83%' }}>
            <span>295 registros 36.83 %</span>
          </div>
        </div>
      </section>

      <section className="detailed-reports">
        <h2>Detalle de Denuncias</h2>
        <ul>
          <li>
            <strong>(BEBELECHE) BEBELECHE, MUSEO INTERACTIVO DE DURANGO</strong>
            <div className="status">
              <span>Sancionadas: [0]</span>
              <span>Cerradas: [0]</span>
              <span>En Proceso: [3]</span>
            </div>
          </li>
          <li>
            <strong>(BYCENED) ESCUELA NORMAL DEL ESTADO DE DURANGO</strong>
            <div className="status">
              <span>Sancionadas: [0]</span>
              <span>Cerradas: [5]</span>
              <span>En Proceso: [1]</span>
            </div>
          </li>
          <li>
            <strong>(CAED) COMISIÓN DEL AGUA DEL ESTADO</strong>
            <div className="status">
              <span>Sancionadas: [0]</span>
              <span>Cerradas: [1]</span>
              <span>En Proceso: [2]</span>
            </div>
          </li>
          <li>
            <strong>(CCCED) CENTRO CULTURAL Y DE CONVENCIONES DE DURANGO</strong>
            <div className="status">
              <span>Sancionadas: [0]</span>
              <span>Cerradas: [1]</span>
              <span>En Proceso: [0]</span>
            </div>
          </li>
        </ul>
      </section>

      <section className="charts">
        <h2>Gráficas de Progreso</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </section>
    </div>
  );
};

export default Dashboard;