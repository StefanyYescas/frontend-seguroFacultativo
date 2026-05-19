import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import "./NavBar.css"

const opciones = [
    "INFORMACIÓN ESCOLAR",
    "INSCRIPCIONES",
    "EVALUACIÓN DOCENTE",
    "MANUAL DE INSCRIPCIONES",
    "CERRAR SESIÓN",
]

const submenuInformacionEscolar = [
    "Tramite Seguro Facultativo"
]

function NavBar({ opcionActiva, onOpcionClick }) {

    const [menuAbierto, setMenuAbierto] = useState(false)

    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout)

    const handleClick = (opcion) => {

        if (opcion === "CERRAR SESIÓN") {
            logout()
            localStorage.removeItem("usuario")
            navigate("/login", { replace: true })
            return
        }

        if (opcion === "INFORMACIÓN ESCOLAR") {
            setMenuAbierto(!menuAbierto)
            return
        }

        onOpcionClick(opcion)
        setMenuAbierto(false)
    }

    return (
        <div className="navbar-wrapper">

            <nav className="navbar">

                {opciones.map((opcion) => (

                    <div key={opcion} className="navbar__item-container">

                        <button
                            className={`navbar__item ${
                                opcionActiva === opcion
                                    ? "navbar__item--activo"
                                    : ""
                            }`}
                            onClick={() => handleClick(opcion)}
                        >
                            {opcion}
                        </button>

                        {/* SUBMENU FIJO */}
                        {opcion === "INFORMACIÓN ESCOLAR" && menuAbierto && (

                            <ul className="navbar__dropdown">

                                {submenuInformacionEscolar.map((sub) => (

                                    <li
                                        key={sub}
                                        className="navbar__dropdown-item"
                                        onClick={() => {
                                            onOpcionClick(sub)
                                            setMenuAbierto(false)
                                        }}
                                    >
                                        {sub}
                                    </li>

                                ))}

                            </ul>

                        )}

                    </div>

                ))}

            </nav>

        </div>
    )
}

export default NavBar