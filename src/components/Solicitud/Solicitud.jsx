import { useState } from "react"
import axios from "axios"

import { useAuthStore } from "../../store/authStore"

import "./Solicitud.css"

function Solicitud() {

    // ARCHIVOS
    const [nss, setNss] = useState(null)

    const [archivo, setArchivo] = useState(null)

    // USUARIO LOGUEADO
    const usuario = useAuthStore(
        (state) => state.usuario
    )

    // ENVIAR
    const handleEnviar = async (e) => {

        e.preventDefault()

        // VALIDACIÓN
        if (!nss || !archivo) {

            alert(
                "Por favor llena todos los campos."
            )

            return
        }

        try {

            // FORMDATA
            const formData = new FormData()

            // UUID DEL USUARIO
            formData.append(
                "idUsuario",
                usuario.idUsuario
            )

            // PDF CONSTANCIA
            formData.append(
                "constancia",
                archivo
            )

            // PDF NSS
            formData.append(
                "nss",
                nss
            )

            // PETICIÓN
            const response = await axios.post(
                "http://127.0.0.1:8000/solicitud/",
                formData
            )

            console.log(response.data)

            alert(
                "Solicitud enviada correctamente."
            )

            // LIMPIAR INPUTS
            setNss(null)

            setArchivo(null)

        } catch (error) {

            console.log(error)

            alert(
                "Error al enviar solicitud."
            )
        }
    }

    return (

        <div className="solicitud">

            <h2 className="solicitud__titulo">
                SISTEMA DE TRAMITE DE SEGURO FACULTATIVO
            </h2>

            <form
                className="solicitud__form"
                onSubmit={handleEnviar}
            >

                {/* INFO */}
                <div className="solicitud__info">

                    <div className="solicitud__info-fila">

                        <span className="solicitud__info-label">
                            DEPARTAMENTO:
                        </span>

                        <span className="solicitud__info-valor">
                            DEPARTAMENTO DE SERVICIOS ESCOLARES
                        </span>

                    </div>

                    <div className="solicitud__info-fila">

                        <span className="solicitud__info-label">
                            ASUNTO:
                        </span>

                        <span className="solicitud__info-valor">
                            TRAMITE SEGURO FACULTATIVO
                        </span>

                    </div>

                </div>

                {/* CAMPOS */}
                <div className="solicitud__campos">

                    {/* NSS */}
                    <div className="solicitud__campo">

                        <label className="solicitud__label">
                            NSS:
                        </label>

                        <input
                            type="file"
                            className="solicitud__file"
                            accept=".pdf"
                            onChange={(e) =>
                                setNss(
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                    {/* CONSTANCIA */}
                    <div className="solicitud__campo">

                        <label className="solicitud__label">
                            CONSTANCIA DE DERECHOS:
                        </label>

                        <input
                            type="file"
                            className="solicitud__file"
                            accept=".pdf"
                            onChange={(e) =>
                                setArchivo(
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="solicitud__boton"
                >
                    Enviar Solicitud
                </button>

            </form>

        </div>
    )
}

export default Solicitud