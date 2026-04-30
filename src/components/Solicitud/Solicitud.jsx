import { useState } from "react"
import "./Solicitud.css"

function Solicitud() {
    const [nss, setNss] = useState(null)
    const [archivo, setArchivo] = useState(null)

    const handleEnviar = (e) => {
        e.preventDefault()
        if (!nss || !archivo) {
            alert("Por favor llena todos los campos.")
            return
        }
        console.log("Enviando solicitud:", { nss, archivo })
        alert("Solicitud enviada correctamente.")
    }

    return (
        <div className="solicitud">

            <h2 className="solicitud__titulo">
                SISTEMA DE TRAMITE DE SEGURO FACULTATIVO
            </h2>

            <form className="solicitud__form" onSubmit={handleEnviar}>

                {/* Info fija */}
                <div className="solicitud__info">
                    <div className="solicitud__info-fila">
                        <span className="solicitud__info-label">DEPARTAMENTO:</span>
                        <span className="solicitud__info-valor">
                            DEPARTAMENTO DE SERVICIOS ESCOLARES
                        </span>
                    </div>
                    <div className="solicitud__info-fila">
                        <span className="solicitud__info-label">ASUNTO:</span>
                        <span className="solicitud__info-valor">
                            TRAMITE SEGURO FACULTATIVO
                        </span>
                    </div>
                </div>

                {/* Campos */}
                <div className="solicitud__campos">

                    <div className="solicitud__campo">
                        <label className="solicitud__label">NSS:</label>
                        <input
                            type="file"
                            className="solicitud__file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setNss(e.target.files[0])}
                        />
                    </div>

                    <div className="solicitud__campo">
                        <label className="solicitud__label">
                            CONSTANCIA DE DERECHOS:
                        </label>
                        <input
                            type="file"
                            className="solicitud__file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setArchivo(e.target.files[0])}
                        />
                    </div>

                </div>

                <button type="submit" className="solicitud__boton">
                    Enviar Solicitud
                </button>

            </form>
        </div>
    )
}

export default Solicitud