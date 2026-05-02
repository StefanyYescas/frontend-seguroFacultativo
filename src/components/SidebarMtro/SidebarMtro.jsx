import "./SidebarMtro.css";
import logo from "../../assets/sep.png";

function PortalMtro() {
  return (
    <div className="admin">
      
      <div className="admin__header">
        <img src={logo} alt="SEP" className="admin__logo" />

        <h1 className="admin__title">
          Sistema Integral de Información
        </h1>

        <h2 className="admin__subtitle">
          INSTITUTO TECNOLÓGICO DE VERACRUZ <br />
          PORTAL DE MAESTROS
        </h2>
      </div>

      <div className="admin__menu">
        <button>Solicitud Seguro Facultativo</button>
        <button>Solicitudes Pendientes</button>
        <button>Historial</button>
      </div>

      <button className="admin__logout">CERRAR SESIÓN</button>

    </div>
  );
}

export default PortalMtro;