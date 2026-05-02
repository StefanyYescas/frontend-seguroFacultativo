import { useState } from "react"
import "./NavBar.css"

// Opciones principales del menú
const opciones = [
    "INFORMACIÓN ESCOLAR",
    "INSCRIPCIONES",
    "EVALUACIÓN DOCENTE",
    "MANUAL DE INSCRIPCIONES",
    "CERRAR SESIÓN",
]

// Submenú de Información Escolar
const submenuInformacionEscolar = [
    "Servicio Social",
    "Residencias",
    "Datos Socioeconómicos",
    "Boleta de Calificaciones",
    "Avance Reticular",
    "Kardex de Calificaciones",
    "Horario",
    "Liberación de Idiomas",
    "Calif. de Exámenes Globales o Especiales",
    "Calificaciones Parciales",
    "Quejas y Sugerencias",
    "Comite Academico",
    "Centro de Información",
    "Egresados",
    "Gestión del curso",
    "Cambiar NIP",
    "Cita para Ventanilla de Escolares",
    "Cita para Trámites de Gestión Tecnológica y Vinculación",
    "Biblioteca Digital",
    "Tramite Seguro Facultativo"
]

function NavBar({ opcionActiva, onOpcionClick }) {
    const [hoverIndex, setHoverIndex] = useState(null)

    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                {opciones.map((opcion, index) => (
                    <div 
                        key={opcion} 
                        className="navbar__item-container"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <button
                            className={`navbar__item ${opcionActiva === opcion ? "navbar__item--activo" : ""}`}
                            onClick={() => onOpcionClick(opcion)}
                        >
                            {opcion}
                        </button>
                        
                        {/* Dropdown menu para INFORMACIÓN ESCOLAR */}
                        {opcion === "INFORMACIÓN ESCOLAR" && hoverIndex === index && (
                            <ul className="navbar__dropdown">
                                {submenuInformacionEscolar.map((subOpcion) => (
                                    <li 
                                        key={subOpcion} 
                                        className="navbar__dropdown-item"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onOpcionClick(subOpcion);
                                            setHoverIndex(null);
                                        }}
                                    >
                                        {subOpcion}
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