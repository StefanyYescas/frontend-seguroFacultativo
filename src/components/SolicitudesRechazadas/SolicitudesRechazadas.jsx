import { useEffect } from "react"
import "./SolicitudesRechazadas.css"

import { obtenerRechazadas } from "../../hooks/useSolicitud"
import { useSolicitudStore } from "../../store/useSolicitudStore"

function SolicitudesRechazadas() {

    const { solicitudes, setSolicitudes } = useSolicitudStore()

    // =========================
    // CARGAR
    // =========================
    useEffect(() => {
        cargarSolicitudes()
    }, [])

    const cargarSolicitudes = async () => {

        const response = await obtenerRechazadas()

        if (response.success) {
            setSolicitudes(response.data)
        }
    }

    return (

        <div className="solicitudes-container">

            <h1 className="solicitudes-title">
                SOLICITUDES RECHAZADAS
            </h1>

            <div className="tabla-container">

                <table className="tabla-solicitudes">

                    <thead>

                        <tr>

                            <th>Fecha Solicitud</th>

                            <th>No. Control</th>

                            <th>Alumno</th>

                            <th>Carrera</th>

                            <th>Semestre</th>

                            <th>NSS</th>

                            <th>Constancia</th>

                            <th>Observación</th>

                            <th>Estado</th>

                        </tr>

                    </thead>

                    <tbody>

                        {solicitudes.map((solicitud) => (

                            <tr key={solicitud.idSolicitud}>

                                {/* FECHA */}

                                <td>

                                    {
                                        new Date(
                                            solicitud.fechaSolicitud
                                        ).toLocaleDateString("es-MX")
                                    }

                                </td>

                                {/* DATOS */}

                                <td>
                                    {solicitud.numControl}
                                </td>

                                <td>
                                    {solicitud.nomCompleto}
                                </td>

                                <td>
                                    {solicitud.carrera}
                                </td>

                                <td>
                                    {solicitud.semestre}
                                </td>

                                {/* NSS */}

                                <td>

                                    <a
                                        href={`http://127.0.0.1:8000/${solicitud.rutaNss}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Ver PDF
                                    </a>

                                </td>

                                {/* CONSTANCIA */}

                                <td>

                                    <a
                                        href={`http://127.0.0.1:8000/${solicitud.rutaConstancia}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Ver PDF
                                    </a>

                                </td>

                                {/* OBSERVACIÓN */}

                                <td>

                                    {
                                        solicitud.observacion
                                            ? solicitud.observacion
                                            : "Sin observación"
                                    }

                                </td>

                                {/* ESTADO */}

                                <td>

                                    <span
                                        className={`estado ${solicitud.estado}`}
                                    >
                                        {solicitud.estado}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default SolicitudesRechazadas