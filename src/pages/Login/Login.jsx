import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import fondo from "../../assets/fondoitver.jpg"
import logoITV from "../../assets/logo-itv.png"
import logo from "../../assets/sep.png"
import "./Login.css"

function Login() {
  const [tabActiva, setTabActiva] = useState("alumno")
  const [numControl, setNumControl] = useState("")
  const [nip, setNip] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!numControl || !nip) {
      setError("Por favor llena todos los campos.")
      return
    }
    setError("")
    console.log("Login:", { numControl, nip, rol: tabActiva })
    
    // Save to localStorage as requested
    localStorage.setItem("alumnoActual", JSON.stringify({
      numControl: numControl,
      nombre: "nombre del alumno"
    }))

    navigate("/alumno/portal")
  }

  return (
    <div className="login">
      <Header />

      <div
        className="login__hero"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        {/* Logo ITV flotando — ahora usa logoITV ✅ */}
        <div className="login__logo-wrapper">
          <img src={logoITV} alt="Logo ITV" className="login__logo" />
        </div>

        <div className="login__card">
          <div className="login__tabs">
            <button
              className={`login__tab ${tabActiva === "alumno" ? "login__tab--activa" : ""}`}
              onClick={() => setTabActiva("alumno")}
            >
              Alumnos
            </button>
            <button
              className={`login__tab ${tabActiva === "personal" ? "login__tab--activa" : ""}`}
              onClick={() => setTabActiva("personal")}
            >
              Personal
            </button>
          </div>

          <p className="login__acceso">
            {tabActiva === "alumno" ? "Acceso a Alumnos" : "Acceso a Personal"}
          </p>

          <form className="login__form" onSubmit={handleLogin}>
            <input
              type="text"
              className="login__input"
              placeholder="No. de Control"
              value={numControl}
              onChange={(e) => setNumControl(e.target.value)}
            />
            <input
              type="password"
              className="login__input"
              placeholder="NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />

            {error && <p className="login__error">{error}</p>}

            <button type="submit" className="login__boton">
              Ingresar
            </button>
          </form>
        </div>
      </div>

      {/* Footer — sigue usando logo = sep.png ✅ */}
      <footer className="login__footer">
        <img src={logo} alt="SEP" className="login__footer-logo" />
      </footer>

    </div>
  )
}

export default Login