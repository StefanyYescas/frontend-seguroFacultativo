import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login"
import PortalAlumno from "../pages/PortalAlumno/PortalAlumno"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/alumno/portal" element={<PortalAlumno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter