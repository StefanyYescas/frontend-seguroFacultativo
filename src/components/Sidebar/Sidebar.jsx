import "./Sidebar.css"

// Lista de opciones del sidebar
// Por ahora solo hay una, pero así es fácil agregar más después
const opciones = [
    "Trámite Seguro Facultativo",
]

function Sidebar({ opcionActiva, onOpcionClick }) {
    return (
        <aside className="sidebar">
            {opciones.map((opcion) => (
                <button
                    key={opcion}
                    className={`sidebar__item ${opcionActiva === opcion ? "sidebar__item--activo" : ""}`}
                    onClick={() => onOpcionClick(opcion)}
                >
                    {opcion}
                </button>
            ))}
        </aside>
    )
}

export default Sidebar