import { useState } from "react"
import api from "../../utils/api"

import "./RegistrarAlumno.css"

function RegistrarAlumno() {

  const [formData, setFormData] = useState({
    nomCompleto: "",
    numControl: "",
    correo: "",
    contrasena: "",
    carrera: "",
    semestre: "",
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const [exito, setExito] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
    setExito("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setExito("")

    const { nomCompleto, numControl, correo, contrasena, carrera, semestre } = formData

    if (!nomCompleto || !numControl || !correo || !contrasena || !carrera || !semestre) {
      setError("Todos los campos son obligatorios")
      return
    }

    setCargando(true)

    try {
      const resUsuario = await api.post("/usuario/crear", {
        nomCompleto,
        numControl,
        correo,
        contrasena,
        rol: "alumno",
      })

      const idUsuario = resUsuario.data.idUsuario

      await api.post("/alumno/crear", {
        carrera,
        semestre: parseInt(semestre),
        idUsuario,
      })

      setExito(`Alumno "${nomCompleto}" registrado correctamente`)
      setFormData({
        nomCompleto: "",
        numControl: "",
        correo: "",
        contrasena: "",
        carrera: "",
        semestre: "",
      })
    } catch (err) {
      const msg = err.response?.data?.detail?.[0]?.msg || err.response?.data?.error || "Error al registrar alumno"
      setError(msg)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="registrar">
      <div className="registrar__card">
        <h2 className="registrar__titulo">Registrar Alumno</h2>

        {error && <p className="registrar__error">{error}</p>}
        {exito && <p className="registrar__exito">{exito}</p>}

        <form className="registrar__form" onSubmit={handleSubmit}>
          <div className="registrar__grid">
            <div className="registrar__campo">
              <label className="registrar__label">Nombre Completo</label>
              <input
                type="text"
                name="nomCompleto"
                className="registrar__input"
                placeholder="Ej. Juan Pérez López"
                value={formData.nomCompleto}
                onChange={handleChange}
              />
            </div>

            <div className="registrar__campo">
              <label className="registrar__label">No. Control</label>
              <input
                type="text"
                name="numControl"
                className="registrar__input"
                placeholder="Ej. 21020421"
                value={formData.numControl}
                onChange={handleChange}
              />
            </div>

            <div className="registrar__campo">
              <label className="registrar__label">Correo Institucional</label>
              <input
                type="email"
                name="correo"
                className="registrar__input"
                placeholder="Ej. L21020421@veracruz.tecnm.mx"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <div className="registrar__campo">
              <label className="registrar__label">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                className="registrar__input"
                placeholder="Contraseña"
                value={formData.contrasena}
                onChange={handleChange}
              />
            </div>

            <div className="registrar__campo">
              <label className="registrar__label">Carrera</label>
              <input
                type="text"
                name="carrera"
                className="registrar__input"
                placeholder="Ej. Sistemas Computacionales"
                value={formData.carrera}
                onChange={handleChange}
              />
            </div>

            <div className="registrar__campo">
              <label className="registrar__label">Semestre</label>
              <input
                type="number"
                name="semestre"
                className="registrar__input"
                placeholder="Ej. 8"
                min="1"
                max="15"
                value={formData.semestre}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="registrar__boton"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrar Alumno"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrarAlumno
