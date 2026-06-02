import "./SidebarMtro.css"

import logo from "../../assets/sep.png"

import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../../store/authStore"

function SidebarMtro() {

  
  const navigate = useNavigate()
 
  const logout = useAuthStore(
    (state) => state.logout
  )



  const irSolicitud = () => {

    navigate(
      "/maestro/solicitudes"
    )

  }

  const irAprobadas = () => {

    navigate(
      "/maestro/aprobadas"
    )

  }

   const irRechazadas = () => {

    navigate(
      "/maestro/rechazadas"
    )

  }
  const irHistorial = () => {

    navigate(
      "/maestro/historial"
    )

  }

  const irRegistrar = () => {

    navigate(
      "/maestro/registrar"
    )

  }

  
  const cerrarSesion = () => {

    // LIMPIAR STORE
    logout()

    // REDIRIGIR LOGIN
    navigate(
      "/login",
      { replace: true }
    )

  }

  return (

    <div className="admin">

      {/* HEADER */}
      <div className="admin__header">

        <img
          src={logo}
          alt="SEP"
          className="admin__logo"
        />

        <h1 className="admin__title">
          Sistema Integral de Información
        </h1>

        <h2 className="admin__subtitle">
          INSTITUTO TECNOLÓGICO DE VERACRUZ
          <br />
          PORTAL DE MAESTROS
        </h2>

      </div>

      {/* MENÚ */}
      <div className="admin__menu">

        <button onClick={irSolicitud}>
          Solicitudes Seguro Facultativo
        </button>

        <button onClick={irAprobadas}>
          Solicitudes Aprobadas
        </button>

        <button onClick={irRechazadas}>
          Solicitudes Rechazadas
        </button>

        <button onClick={irHistorial}>
          Historial
        </button>

        <button onClick={irRegistrar}>
          Registrar Alumnos
        </button>

      </div>

      {/* LOGOUT */}
      <button
        className="admin__logout"
        onClick={cerrarSesion}
      >
        CERRAR SESIÓN
      </button>

    </div>

  )
}

export default SidebarMtro