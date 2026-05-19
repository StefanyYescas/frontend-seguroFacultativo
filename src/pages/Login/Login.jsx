import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header/Header"

import fondo from "../../assets/fondoitver.jpg"
import logoITV from "../../assets/logo-itv.png"
import logo from "../../assets/sep.png"

import "./Login.css"

import { loginUser } from "../../hooks/useAuth"

import { useAuthStore } from "../../store/authStore"

function Login() {

  // =========================
  // STATES
  // =========================
  const [tabActiva, setTabActiva] = useState("alumno")

  const [numControl, setNumControl] = useState("")

  const [nip, setNip] = useState("")

  const [error, setError] = useState("")

  // =========================
  // NAVIGATE
  // =========================
  const navigate = useNavigate()

  // =========================
  // ZUSTAND
  // =========================
  const login = useAuthStore(
    (state) => state.login
  )

  const usuario = useAuthStore(
    (state) => state.usuario
  )

  // =========================
  // REDIRECCIÓN SI YA LOGEÓ
  // =========================
  useEffect(() => {

    if (!usuario) return

    // ALUMNO
    if (
      usuario.rol?.toLowerCase() === "alumno"
    ) {

      navigate(
        "/alumno/portal",
        { replace: true }
      )

    }

    // ADMIN
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
  // LOGIN
  // =========================
  const handleLogin = async (e) => {

    e.preventDefault()

    // VALIDACIÓN
    if (!numControl || !nip) {

      setError(
        "Por favor llena todos los campos."
      )

      return
    }

    // LIMPIAR ERROR
    setError("")

    // PETICIÓN LOGIN
    const result = await loginUser(
      numControl,
      nip
    )

    console.log(
      "RESULTADO LOGIN:",
      result
    )

    // =========================
    // ERROR LOGIN
    // =========================
    if (!result.success) {

      setError(
        result.error ||
        "Error al iniciar sesión"
      )

      return
    }

    // =========================
    // DATA BACKEND
    // =========================
    const data = result.data

    console.log(
      "DATA LOGIN:",
      data
    )

    // VALIDAR ROL
    if (!data.rol) {

      setError(
        "El usuario no tiene rol."
      )

      return
    }

    // =========================
    // GUARDAR EN STORE
    // =========================
    login(data)

    // =========================
    // REDIRECCIÓN
    // =========================

    // ALUMNO
    if (
      data.rol.toLowerCase() === "alumno"
    ) {

      navigate(
        "/alumno/portal",
        { replace: true }
      )

    }

    // ADMIN
    else if (
      data.rol.toLowerCase() === "admin"
    ) {

      navigate(
        "/maestro/portal",
        { replace: true }
      )

    }

    // ROL INVÁLIDO
    else {

      setError(
        `Rol inválido: ${data.rol}`
      )

    }

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

          {/* TABS */}
          <div className="login__tabs">

            {/* ALUMNO */}
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

            {/* PERSONAL */}
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

          {/* TEXTO */}
          <p className="login__acceso">

            {tabActiva === "alumno"

              ? "Acceso a Alumnos"

              : "Acceso a Personal"

            }

          </p>

          {/* FORM */}
          <form
            className="login__form"
            onSubmit={handleLogin}
          >

            {/* NUM CONTROL */}
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

            {/* PASSWORD */}
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

            {/* ERROR */}
            {error && (

              <p className="login__error">
                {error}
              </p>

            )}

            {/* BOTÓN */}
            <button
              type="submit"
              className="login__boton"
            >
              Ingresar
            </button>

          </form>

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