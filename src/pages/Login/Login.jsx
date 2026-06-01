import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header/Header"

import fondo from "../../assets/fondoitver.jpg"
import logoITV from "../../assets/logo-itv.png"
import logo from "../../assets/sep.png"

import "./Login.css"

import { paso1Login, paso2Verificar, paso3Confirmar, reenviarCodigo } from "../../hooks/useAuth"

import { useAuthStore } from "../../store/authStore"

function enmascararCorreo(correo) {

  const [nombre, dominio] = correo.split("@")

  if (nombre.length <= 2) {

    return `${nombre[0]}***@${dominio}`
  }

  return `${nombre[0]}${nombre[1]}***@${dominio}`
}

function Login() {

  
  // ESTADO DEL PASO
  
  const [paso, setPaso] = useState(1)

  
  // PASO 1 — CREDENCIALES
  
  const [tabActiva, setTabActiva] = useState("alumno")

  const [numControl, setNumControl] = useState("")

  const [nip, setNip] = useState("")

  const [cargandoPaso1, setCargandoPaso1] = useState(false)

  
  // PASO 2 — CÓDIGO OTP
  
  const [tempToken, setTempToken] = useState("")

  const [correoDestino, setCorreoDestino] = useState("")

  const [codigo, setCodigo] = useState("")

  const [cargandoPaso2, setCargandoPaso2] = useState(false)

  const [tiempoReenvio, setTiempoReenvio] = useState(0)

  const [reenviando, setReenviando] = useState(false)

  
  // PASO 3 — CONFIRMAR
  
  const [nombreUsuario, setNombreUsuario] = useState("")

  const [numControlConfirmar, setNumControlConfirmar] = useState("")

  const [rolConfirmar, setRolConfirmar] = useState("")

  const [cargandoPaso3, setCargandoPaso3] = useState(false)

  
  // ERROR
  
  const [error, setError] = useState("")

  
  // NAVIGATE
  
  const navigate = useNavigate()

  
  // ZUSTAND
  
  const login = useAuthStore(
    (state) => state.login
  )

  const usuario = useAuthStore(
    (state) => state.usuario
  )

  
  // REDIRECCIÓN SI YA HAY SESIÓN
  
  useEffect(() => {

    if (!usuario) return

    if (
      usuario.rol?.toLowerCase() === "alumno"
    ) {

      navigate(
        "/alumno/portal",
        { replace: true }
      )

    }

    else if (
      usuario.rol?.toLowerCase() === "admin"
    ) {

      navigate(
        "/maestro/portal",
        { replace: true }
      )

    }

  }, [usuario, navigate])

  
  // =========================
  // PASO 1 — CREDENCIALES
  // =========================
  
  const handlePaso1 = async (e) => {

    e.preventDefault()

    if (!numControl || !nip) {

      setError(
        "Por favor llena todos los campos."
      )

      return
    }

    setError("")

    setCargandoPaso1(true)

    const result = await paso1Login(
      numControl,
      nip
    )

    setCargandoPaso1(false)

    if (!result.success) {

      setError(
        result.error ||
        "Error al iniciar sesión"
      )

      return
    }

    const data = result.data

    setTempToken(data.tempToken)

    setCorreoDestino(
      enmascararCorreo(data.correo)
    )

    setPaso(2)

    setTiempoReenvio(30)
  }

  
  // CONTADOR REENVIAR
  
  useEffect(() => {

    if (tiempoReenvio <= 0) return

    const timer = setTimeout(() => {

      setTiempoReenvio(
        tiempoReenvio - 1
      )

    }, 1000)

    return () => clearTimeout(timer)

  }, [tiempoReenvio])

  
  // REENVIAR CÓDIGO
  
  const handleReenviar = async () => {

    if (
      tiempoReenvio > 0 || reenviando
    ) return

    setError("")

    setReenviando(true)

    const result = await reenviarCodigo(
      tempToken
    )

    setReenviando(false)

    if (!result.success) {

      setError(
        result.error ||
        "Error al reenviar"
      )

      return
    }

    setTiempoReenvio(30)
  }

  
  // =========================
  // PASO 2 — CÓDIGO OTP
  // =========================
  
  const handlePaso2 = async (e) => {

    e.preventDefault()

    if (!codigo) {

      setError(
        "Ingresa el código de verificación."
      )

      return
    }

    setError("")

    setCargandoPaso2(true)

    const result = await paso2Verificar(
      tempToken,
      codigo
    )

    setCargandoPaso2(false)

    if (!result.success) {

      setError(
        result.error ||
        "Código inválido"
      )

      return
    }

    const data = result.data

    setNombreUsuario(data.usuario)

    setNumControlConfirmar(data.numControl)

    setRolConfirmar(data.rol)

    setTempToken(data.tempToken)

    setPaso(3)
  }

  
  // =========================
  // PASO 3 — CONFIRMAR
  // =========================
  
  const handlePaso3 = async () => {

    setError("")

    setCargandoPaso3(true)

    const result = await paso3Confirmar(
      tempToken,
      rolConfirmar
    )

    setCargandoPaso3(false)

    if (!result.success) {

      setError(
        result.error ||
        "Error al confirmar"
      )

      return
    }

    const data = result.data

    login(data)

    if (
      data.rol.toLowerCase() === "alumno"
    ) {

      navigate(
        "/alumno/portal",
        { replace: true }
      )

    }

    else if (
      data.rol.toLowerCase() === "admin"
    ) {

      navigate(
        "/maestro/portal",
        { replace: true }
      )

    }

  }

  
  // VOLVER AL PASO ANTERIOR
  
  const volverPaso1 = () => {

    setError("")

    setPaso(1)
  }

  return (

    <div className="login">

      <Header />

      <div
        className="login__hero"
        style={{
          backgroundImage: `url(${fondo})`
        }}
      >

        {/* LOGO */}
        <div className="login__logo-wrapper">

          <img
            src={logoITV}
            alt="Logo ITV"
            className="login__logo"
          />

        </div>

        {/* CARD */}
        <div className="login__card">


          {/* ========================= */}
          {/* PASO 1 — CREDENCIALES */}
          {/* ========================= */}

          {paso === 1 && (

            <>

              {/* TABS */}
              <div className="login__tabs">

                <button
                  type="button"
                  className={`login__tab ${
                    tabActiva === "alumno"
                      ? "login__tab--activa"
                      : ""
                  }`}
                  onClick={() =>
                    setTabActiva("alumno")
                  }
                >
                  Alumnos
                </button>

                <button
                  type="button"
                  className={`login__tab ${
                    tabActiva === "personal"
                      ? "login__tab--activa"
                      : ""
                  }`}
                  onClick={() =>
                    setTabActiva("personal")
                  }
                >
                  Personal
                </button>

              </div>

              <p className="login__acceso">

                {tabActiva === "alumno"

                  ? "Acceso a Alumnos"

                  : "Acceso a Personal"
                }

              </p>

              <form
                className="login__form"
                onSubmit={handlePaso1}
              >

                <input
                  type="text"
                  className="login__input"
                  placeholder="No. de Control"
                  value={numControl}
                  onChange={(e) =>
                    setNumControl(
                      e.target.value
                    )
                  }
                />

                <input
                  type="password"
                  className="login__input"
                  placeholder="NIP"
                  value={nip}
                  onChange={(e) =>
                    setNip(
                      e.target.value
                    )
                  }
                />

                {error && (

                  <p className="login__error">
                    {error}
                  </p>

                )}

                <button
                  type="submit"
                  className="login__boton"
                  disabled={cargandoPaso1}
                >
                  {cargandoPaso1
                    ? "Enviando..."
                    : "Enviar código"
                  }
                </button>

              </form>

            </>

          )}


          {/* ========================= */}
          {/* PASO 2 — CÓDIGO OTP */}
          {/* ========================= */}

          {paso === 2 && (

            <>

              <div className="login__paso-header">

                <p className="login__paso-titulo">
                  Verificación en dos pasos
                </p>

                <p className="login__paso-sub">
                  Hemos enviado un código a:
                </p>

                <p className="login__paso-correo">
                  {correoDestino}
                </p>

              </div>

              <form
                className="login__form"
                onSubmit={handlePaso2}
              >

                <input
                  type="text"
                  className="login__input login__input--codigo"
                  placeholder="Código de verificación"
                  maxLength={6}
                  value={codigo}
                  onChange={(e) =>
                    setCodigo(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {error && (

                  <p className="login__error">
                    {error}
                  </p>

                )}

                <button
                  type="submit"
                  className="login__boton"
                  disabled={cargandoPaso2}
                >
                  {cargandoPaso2
                    ? "Verificando..."
                    : "Verificar"
                  }
                </button>

              </form>

              {tiempoReenvio > 0 ? (

                <p className="login__reenviar-timer">
                  Reenviar código en {tiempoReenvio}s
                </p>

              ) : (

                <button
                  type="button"
                  className="login__reenviar"
                  onClick={handleReenviar}
                  disabled={reenviando}
                >
                  {reenviando
                    ? "Enviando..."
                    : "Reenviar código"
                  }
                </button>

              )}

              <button
                type="button"
                className="login__link"
                onClick={volverPaso1}
              >
                ← Volver
              </button>

            </>

          )}


          {/* ========================= */}
          {/* PASO 3 — CONFIRMAR */}
          {/* ========================= */}

          {paso === 3 && (

            <>

              <div className="login__paso-header">

                <p className="login__paso-titulo">
                  Confirmar inicio de sesión
                </p>

              </div>

              <div className="login__resumen">

                <div className="login__resumen-item">
                  <span className="login__resumen-label">
                    Nombre
                  </span>
                  <span className="login__resumen-valor">
                    {nombreUsuario}
                  </span>
                </div>

                <div className="login__resumen-item">
                  <span className="login__resumen-label">
                    No. Control
                  </span>
                  <span className="login__resumen-valor">
                    {numControlConfirmar}
                  </span>
                </div>

                <div className="login__resumen-item">
                  <span className="login__resumen-label">
                    Rol
                  </span>
                  <span className="login__resumen-valor">
                    {rolConfirmar === "alumno"
                      ? "Alumno"
                      : "Administrador"
                    }
                  </span>
                </div>

              </div>

              <form
                className="login__form"
                onSubmit={(e) => { e.preventDefault(); handlePaso3() }}
              >

              {error && (

                <p className="login__error">
                  {error}
                </p>

              )}

              <button
                type="submit"
                className="login__boton"
                disabled={cargandoPaso3}
              >
                {cargandoPaso3
                  ? "Ingresando..."
                  : "Confirmar e Ingresar"
                }
              </button>

              </form>

              <button
                type="button"
                className="login__link"
                onClick={volverPaso1}
              >
                ← Cancelar
              </button>

            </>

          )}


        </div>

      </div>

      {/* FOOTER */}
      <footer className="login__footer">

        <img
          src={logo}
          alt="SEP"
          className="login__footer-logo"
        />

      </footer>

    </div>
  )
}

export default Login