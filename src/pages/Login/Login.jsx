import Header from "../../components/Header/Header"
import fondo from "../../assets/fondoitver.jpg"
import "./Login.css"

function Login() {
  return (
    <div
      className="login"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <Header />

      
    </div>
  )
}

export default Login