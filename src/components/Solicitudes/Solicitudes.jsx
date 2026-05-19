import { useEffect, useState } from "react"

import "./Solicitudes.css"

import {
    obtenerSolicitudes,
    actualizarSolicitud,
    entregarSeguro
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
    // MODAL RECHAZO
    // =========================

    const [modal, setModal] = useState(false)

    // =========================
    // MODAL APROBACIÓN
    // =========================

    const [modalAprobacion, setModalAprobacion] = useState(false)

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)

    const [observacion, setObservacion] = useState("")

    const [archivo, setArchivo] = useState(null)

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
    // ABRIR MODAL APROBACIÓN
    // =========================

    const abrirModalAprobacion = (solicitud) => {

        setSolicitudSeleccionada(solicitud)

        setModalAprobacion(true)
    }

    // =========================
    // CERRAR MODALES
    // =========================

    const cerrarModal = () => {

        setModal(false)

        setModalAprobacion(false)

        setObservacion("")

        setArchivo(null)

        setSolicitudSeleccionada(null)
    }

    // =========================
    // RECHAZAR
    // =========================

    const enviarRechazo = async () => {

        if (!solicitudSeleccionada) return

        const datos = {

            estado: "rechazada",

            observacion: observacion,

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
    // ENTREGAR SEGURO
    // =========================

 // =========================
// ENTREGAR SEGURO (MEJORADO)
// =========================

const [cargando, setCargando] = useState(false)  // 👈 Agrega este estado

const enviarAprobacion = async () => {

    if (!solicitudSeleccionada) return

    if (!archivo) {
        alert("Debes adjuntar el PDF")
        return
    }

    setCargando(true)  // 👈 Mostrar carga

    const datos = {
        observacion,
        archivo
    }

    const response = await entregarSeguro(
        solicitudSeleccionada.idSolicitud,
        datos
    )

    setCargando(false)  // 👈 Ocultar carga

    if (response.success) {
        alert("Seguro entregado correctamente")
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
                MODAL APROBACIÓN
            ========================= */}

            {modalAprobacion && (

                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            Entregar Seguro
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
                            Adjuntar PDF
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setArchivo(
                                    e.target.files[0]
                                )
                            }
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
                                onClick={enviarAprobacion}
                                disabled={cargando}  // 👈 Deshabilitar mientras carga
                            >
                                {cargando ? "Enviando..." : "Enviar"}
                            </button>   

                        </div>

                    </div>

                </div>

            )}

        </>
    )
}

export default Solicitudes