import { useEffect } from "react"

import "./SolicitudesAprobadas.css"

import { obtenerAprobadas } from "../../hooks/useSolicitud"

import { useSolicitudStore } from "../../store/useSolicitudStore"

function SolicitudesAprobadas() {

    const {
        solicitudes,
        setSolicitudes
    } = useSolicitudStore()

    // =========================
    // CARGAR
    // =========================

    useEffect(() => {

        cargarSolicitudes()

    }, [])

    const cargarSolicitudes = async () => {

        const response = await obtenerAprobadas()

        if (response.success) {

            setSolicitudes(response.data)

        }
    }

    return (

        <div className="solicitudes-container">

            <h1 className="solicitudes-title">
                SOLICITUDES APROBADAS
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

                            <th>Seguro</th>

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

                                {/* CONTROL */}

                                <td>
                                    {solicitud.numControl}
                                </td>

                                {/* ALUMNO */}

                                <td>
                                    {solicitud.nomCompleto}
                                </td>

                                {/* CARRERA */}

                                <td>
                                    {solicitud.carrera}
                                </td>

                                {/* SEMESTRE */}

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

                                {/* SEGURO */}

                                <td>

                                    {
                                        solicitud.rutaSeguro ? (

                                            <a
                                                href={`http://127.0.0.1:8000/${solicitud.rutaSeguro}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Ver Seguro
                                            </a>

                                        ) : (

                                            <span>
                                                No disponible
                                            </span>

                                        )
                                    }

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

export default SolicitudesAprobadas