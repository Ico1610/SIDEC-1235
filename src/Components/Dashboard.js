import React from "react";
import '../styles/Dashboard.css';

const data = [
  {
  
  },
  {
    name: "(BYCENED) ESCUELA NORMAL DEL ESTADO DE DURANGO",
    sancionadas: 0,
    cerradas: 5,
    proceso: 1,
  },
  {
    name: "(CAED) COMISIÓN DEL AGUA DEL ESTADO",
    sancionadas: 0,
    cerradas: 1,
    proceso: 2,
  },
  {
    name: "(CCCED) CENTRO CULTURAL Y DE CONVENCIONES DE DURANGO",
    sancionadas: 0,
    cerradas: 1,
    proceso: 0,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
      <h1 className="dashboard-title">SISTEMA INTEGRAL DE DENUNCIAS CIUDADANA</h1>

        <p> Gestión Eficiente Y Seguimiento Detallado De Denuncias</p>
=======
        <h1> Gestión eficiente y seguimiento detallado de denuncias.</h1>
        <p>Tablero General</p>
(estilos de peril y login)
      </header>

      <section className="statistics-container">
        {[
          {
            title: "Total de Denuncias",
            percentage: "100%",
            count: 801,
            className: "total",
          },
          {
            title: "Sancionadas",
            percentage: "0.12%",
            count: 1,
            className: "sanctionadas",
          },
          {
            title: "Cerradas",
            percentage: "63.05%",
            count: 505,
            className: "cerradas",
          },
          {
            title: "En Proceso",
            percentage: "36.83%",
            count: 295,
            className: "proceso",
          },
        ].map((stat, index) => (
          <div key={index} className={`stat-card improved-card ${stat.className}-card`}>
            <h2>{stat.title}</h2>
            <div className="stat-content">
              <div className={`progress-circle ${stat.className}`}>
                <span>{stat.percentage}</span>
              </div>
              <p>{stat.count} Registros</p>
            </div>
          </div>
        ))}
      </section>

      <section className="detailed-reports">
        <h2 className="dashboard-subtitle">Detalle de Denuncias por Institución</h2>
        <div className="report-cards-container">
          {data.map((item, index) => (
            <div key={index} className="report-card">
              <h3>{item.name}</h3>
              <div className="status">
                {[
                  { label: "Sancionadas", value: item.sancionadas, className: "sancionadas" },
                  { label: "Cerradas", value: item.cerradas, className: "cerradas" },
                  { label: "En Proceso", value: item.proceso, className: "proceso" },
                ].map((status, idx) => (
                  <div key={idx} className="status-item">
                    <span className={`status-label ${status.className}`}>{status.label}</span>
                    <span className="status-value">{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
