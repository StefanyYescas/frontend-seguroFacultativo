import { useState } from "react"
import HeaderPortal from "../../components/HeaderPortal/HeaderPortal"
import NavBar from "../../components/NavBar/NavBar"
import Solicitud from "../../components/Solicitud/Solicitud"
import logoITV from "../../assets/logo-itv.png"
import "./PortalAlumno.css"

import { useAuthStore } from "../../store/authStore"

function PortalAlumno() {

    const [navActiva, setNavActiva] = useState("INFORMACIÓN ESCOLAR")

    // 🟢 ESTO VIENE DE ZUSTAND
    const alumno = useAuthStore((state) => state.usuario)

    const logout = useAuthStore((state) => state.logout)

    const handleCerrarSesion = (opcion) => {

        if (opcion === "CERRAR SESIÓN") {
            logout() //  limpia sesión global
            window.location.href = "/login"
            return
        }

        setNavActiva(opcion)
    }

    const renderContenido = () => {

        if (navActiva === "Tramite Seguro Facultativo") {
            return <Solicitud />
        }

        return (
            <>
                <div className="portal__bienvenida">
                    <p className="portal__bienvenida-texto">BIENVENIDO(A)</p>

                    {alumno ? (
                        <>
                            <p className="portal__bienvenida-control">
                                {alumno.numControl}
                            </p>

                            <p className="portal__bienvenida-nombre">
                                {alumno.usuario}
                            </p>
                        </>
                    ) : (
                        <p className="portal__bienvenida-nombre">ALUMNO(A)</p>
                    )}
                </div>

                <div className="portal__logo-wrapper">
                    <img src={logoITV} alt="Logo ITV" className="portal__logo" />
                </div>
            </>
        )
    }

    return (
        <div className="portal">

            <HeaderPortal />

            <NavBar
                opcionActiva={navActiva}
                onOpcionClick={handleCerrarSesion}
            />

            <div className="portal__cuerpo">
                <main className="portal__main">
                    {renderContenido()}
                </main>
            </div>

        </div>
    )
}

export default PortalAlumno