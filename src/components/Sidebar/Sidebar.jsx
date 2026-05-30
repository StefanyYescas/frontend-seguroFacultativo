import "./Sidebar.css"


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