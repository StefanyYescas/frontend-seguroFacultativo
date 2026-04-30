import { useState, useEffect } from "react"
import HeaderPortal from "../../components/HeaderPortal/HeaderPortal"
import NavBar from "../../components/NavBar/NavBar"
import Solicitud from "../../components/Solicitud/Solicitud"
import logoITV from "../../assets/logo-itv.png"
import "./PortalAlumno.css"

function PortalAlumno() {
    const [navActiva, setNavActiva] = useState("INFORMACIÓN ESCOLAR")
    const [alumno, setAlumno] = useState(null)

    useEffect(() => {
        const storedAlumno = localStorage.getItem("alumnoActual")
        if (storedAlumno) {
            setAlumno(JSON.parse(storedAlumno))
        }
    }, [])

    const handleCerrarSesion = (opcion) => {
        if (opcion === "CERRAR SESIÓN") {
            localStorage.removeItem("alumnoActual")
            window.location.href = "/login"
            return
        }
        setNavActiva(opcion)
    }

    // Decide qué mostrar según lo que esté activo en el navbar/dropdown
    const renderContenido = () => {
        if (navActiva === "Tramite Seguro Facultativo") {
            return <Solicitud />
        }
        // Vista por defecto: bienvenida + logo
        return (
            <>
                <div className="portal__bienvenida">
                    <p className="portal__bienvenida-texto">BIENVENIDO(A)</p>
                    {alumno ? (
                        <>
                            <p className="portal__bienvenida-control">{alumno.numControl}</p>
                            <p className="portal__bienvenida-nombre">{alumno.nombre}</p>
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