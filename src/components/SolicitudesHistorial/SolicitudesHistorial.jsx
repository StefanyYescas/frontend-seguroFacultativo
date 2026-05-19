import { useEffect } from "react"
import "./SolicitudesHistorial.css"

import { obtenerHistorial } from "../../hooks/useSolicitud"
import { useSolicitudStore } from "../../store/useSolicitudStore"

function Historial() {

    const { solicitudes, setSolicitudes } = useSolicitudStore()

    // =========================
    // CARGAR
    // =========================
    useEffect(() => {
        cargarHistorial()
    }, [])

    const cargarHistorial = async () => {

        const response = await obtenerHistorial()

        if (response.success) {
            setSolicitudes(response.data)
        }

    }

    return (

        <div className="solicitudes-container">

            <h1 className="solicitudes-title">
                HISTORIAL
            </h1>

            <div className="tabla-container">

                <table className="tabla-solicitudes">

                    <thead>

                        <tr>
                            <th>Fecha</th>
                            <th>No. Control</th>
                            <th>Alumno</th>
                            <th>Carrera</th>
                            <th>Semestre</th>
                            <th>NSS</th>
                            <th>Constancia</th>
                            <th>Estado</th>
                            <th>Observación</th>
                        </tr>

                    </thead>

                    <tbody>

                        {solicitudes?.map((solicitud) => (

                            <tr key={solicitud.idSolicitud}>

                                <td>
                                    {
                                        new Date(
                                            solicitud.fechaSolicitud
                                        ).toLocaleDateString("es-MX")
                                    }
                                </td>

                                <td>{solicitud.numControl}</td>

                                <td>{solicitud.nomCompleto}</td>

                                <td>{solicitud.carrera}</td>

                                <td>{solicitud.semestre}</td>

                                <td>

                                    <a
                                        href={`http://127.0.0.1:8000/${solicitud.rutaNss}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Ver PDF
                                    </a>

                                </td>

                                <td>

                                    <a
                                        href={`http://127.0.0.1:8000/${solicitud.rutaConstancia}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Ver PDF
                                    </a>

                                </td>

                                <td>

                                    <span
                                        className={`estado ${solicitud.estado}`}
                                    >
                                        {solicitud.estado}
                                    </span>

                                </td>

                                <td>
                                    {solicitud.observacion}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default Historial