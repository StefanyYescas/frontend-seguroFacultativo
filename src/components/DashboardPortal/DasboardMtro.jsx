import "./DashboardMtro.css";
import escudo from "../../assets/logo-itv.png"; // cambia ruta

function DashboardMtro() {
  return (
    <div className="dashboard">

      <div className="dashboard__content">
        <p className="dashboard__welcome">
          BIENVENIDO(A) MAESTRO(A)
        </p>

        <p className="dashboard__matricula">
          23030008
        </p>

        <p className="dashboard__nombre">
          STEFANY CATHRYN YESCAS <br />
          VARGAS
        </p>

        <img src={escudo} alt="Escudo" className="dashboard__img" />
      </div>

    </div>
  );
}

export default DashboardMtro;