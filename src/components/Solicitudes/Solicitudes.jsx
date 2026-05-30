import { useEffect, useState } from "react"

import "./Solicitudes.css"

import {
    obtenerSolicitudes,
    actualizarSolicitud,
    entregarSeguro,
    previewSeguro
} from "../../hooks/useSolicitud"

import {
    useSolicitudStore
} from "../../store/useSolicitudStore"

function Solicitudes() {

    const {
        solicitudes,
        setSolicitudes
    } = useSolicitudStore()

    // =========================
    // STATES
    // =========================

    const [rutaSeguro, setRutaSeguro] = useState("")

    const [modal, setModal] = useState(false)

    const [modalAprobacion, setModalAprobacion] = useState(false)

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)

    const [observacion, setObservacion] = useState("")

    const [cargando, setCargando] = useState(false)

    // =========================
    // CARGAR
    // =========================

    useEffect(() => {

        cargarSolicitudes()

    }, [])

    const cargarSolicitudes = async () => {

        const response = await obtenerSolicitudes()

        if (response.success) {

            setSolicitudes(response.data)

        } else {

            alert(response.error)

        }
    }

    // =========================
    // ABRIR MODAL RECHAZO
    // =========================

    const abrirModal = (solicitud) => {

        setSolicitudSeleccionada(solicitud)

        setModal(true)
    }

    // =========================
    // ABRIR MODAL APROBACION
    // =========================

    const abrirModalAprobacion = (solicitud) => {

        setSolicitudSeleccionada(solicitud)

        setModalAprobacion(true)

        setRutaSeguro("")
    }

    // =========================
    // CERRAR
    // =========================

    const cerrarModal = () => {

        setModal(false)

        setModalAprobacion(false)

        setObservacion("")

        setRutaSeguro("")

        setSolicitudSeleccionada(null)
    }

    // =========================
    // RECHAZAR
    // =========================

    const enviarRechazo = async () => {

        if (!solicitudSeleccionada) return

        const datos = {

            estado: "rechazada",

            observacion,

            fechaEntrega:
                new Date()
                    .toISOString()
                    .split("T")[0]
        }

        const response = await actualizarSolicitud(

            solicitudSeleccionada.idSolicitud,

            datos
        )

        if (response.success) {

            alert("Solicitud rechazada")

            cerrarModal()

            cargarSolicitudes()

        } else {

            alert(response.error)

        }
    }

    // =========================
    // GENERAR PDF
    // =========================

    const generarPDF = async () => {

        if (!solicitudSeleccionada) return

        setCargando(true)

        const datos = {
            observacion
        }

        const response = await previewSeguro(

            solicitudSeleccionada.idSolicitud,

            datos
        )

        setCargando(false)

        if (response.success) {

            setRutaSeguro(response.data.rutaSeguro)

            alert("PDF generado correctamente")

        } else {

            alert(response.error)

        }
    }

    // =========================
    // ENVIAR SEGURO
    // =========================

    const aprobarSeguro = async () => {

        if (!solicitudSeleccionada) return

        if (!rutaSeguro) {

            alert("Primero genera el PDF")

            return
        }

        setCargando(true)

        const datos = {

            observacion,

            rutaSeguro
        }

        const response = await entregarSeguro(

            solicitudSeleccionada.idSolicitud,

            datos
        )

        setCargando(false)

        if (response.success) {

            alert("Seguro enviado correctamente")

            cerrarModal()

            cargarSolicitudes()

        } else {

            alert(response.error)

        }
    }

    return (

        <>

            <div className="solicitudes-container">

                <h1 className="solicitudes-title">
                    SEGURO FACULTATIVO
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

                                <th>Estado</th>

                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {solicitudes.map((solicitud) => (

                                <tr key={solicitud.idSolicitud}>

                                    <td>

                                        {
                                            new Date(
                                                solicitud.fechaSolicitud
                                            ).toLocaleDateString("es-MX")
                                        }

                                    </td>

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

                                    {/* ESTADO */}

                                    <td>

                                        <span
                                            className={`estado ${solicitud.estado}`}
                                        >
                                            {solicitud.estado}
                                        </span>

                                    </td>

                                    {/* ACCIONES */}

                                    <td className="acciones">

                                        <button
                                            className="btn-aprobar"
                                            onClick={() =>
                                                abrirModalAprobacion(
                                                    solicitud
                                                )
                                            }
                                        >
                                            ✓
                                        </button>

                                        <button
                                            className="btn-rechazar"
                                            onClick={() =>
                                                abrirModal(
                                                    solicitud
                                                )
                                            }
                                        >
                                            ✕
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* =========================
                MODAL RECHAZO
            ========================= */}

            {modal && (

                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            Rechazar Solicitud
                        </h2>

                        <label>
                            Correo
                        </label>

                        <input
                            type="text"
                            value={
                                solicitudSeleccionada?.correo
                            }
                            disabled
                        />

                        <label>
                            Fecha de envío
                        </label>

                        <input
                            type="text"
                            value={
                                new Date()
                                    .toLocaleDateString("es-MX")
                            }
                            disabled
                        />

                        <label>
                            Observación
                        </label>

                        <textarea
                            value={observacion}
                            onChange={(e) =>
                                setObservacion(
                                    e.target.value
                                )
                            }
                        />

                        <div className="modal-buttons">

                            <button
                                className="btn-cancelar"
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-enviar"
                                onClick={enviarRechazo}
                            >
                                Enviar
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* =========================
                MODAL APROBACION
            ========================= */}

            {modalAprobacion && (

                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            Entregar Seguro
                        </h2>

                        {/* CORREO */}

                        <label>
                            Correo
                        </label>

                        <input
                            type="text"
                            value={
                                solicitudSeleccionada?.correo
                            }
                            disabled
                        />

                        {/* FECHA */}

                        <label>
                            Fecha de envío
                        </label>

                        <input
                            type="text"
                            value={
                                new Date()
                                    .toLocaleDateString("es-MX")
                            }
                            disabled
                        />

                        {/* OBSERVACION */}

                        <label>
                            Observación
                        </label>

                        <textarea
                            value={observacion}
                            onChange={(e) =>
                                setObservacion(
                                    e.target.value
                                )
                            }
                        />

                        {/* GENERAR PDF */}

                        <button
                            className="btn-enviar"
                            onClick={generarPDF}
                            disabled={cargando}
                        >

                            {
                                cargando
                                    ? "Generando..."
                                    : "Generar PDF"
                            }

                        </button>

                        {/* VER PDF */}

                        {
                            rutaSeguro && (

                                <div
                                    style={{
                                        marginTop: "20px"
                                    }}
                                >

                                    <a
                                        href={`http://127.0.0.1:8000/${rutaSeguro}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-enviar"
                                        style={{
                                            textDecoration: "none",
                                            display: "inline-block"
                                        }}
                                    >
                                        Ver PDF generado
                                    </a>

                                </div>

                            )
                        }

                        {/* BOTONES */}

                        <div className="modal-buttons">

                            <button
                                className="btn-cancelar"
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </button>

                            {
                                rutaSeguro && (

                                    <button
                                        className="btn-enviar"
                                        onClick={aprobarSeguro}
                                        disabled={cargando}
                                    >

                                        {
                                            cargando
                                                ? "Enviando..."
                                                : "Enviar Seguro"
                                        }

                                    </button>

                                )
                            }

                        </div>

                    </div>

                </div>

            )}

        </>
    )
}

export default Solicitudes