import "./DashboardMtro.css"

import escudo from "../../assets/logo-itv.png"

import { useAuthStore } from "../../store/authStore"

function DashboardMtro() {

  // USUARIO LOGUEADO
  const usuario = useAuthStore(
    (state) => state.usuario
  )

  return (

    <div className="dashboard">

      <div className="dashboard__content">

        {/* BIENVENIDA */}
        <p className="dashboard__welcome">
          BIENVENIDO(A) ADMINISTRADOR(A)
        </p>

        {/* NUM CONTROL */}
        <p className="dashboard__matricula">

          {usuario?.numControl}

        </p>

        {/* NOMBRE */}
        <p className="dashboard__nombre">

          {usuario?.usuario}

        </p>

        {/* LOGO */}
        <img
          src={escudo}
          alt="Escudo"
          className="dashboard__img"
        />

      </div>

    </div>

  )
}

export default DashboardMtro