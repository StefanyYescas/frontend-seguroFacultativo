import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/Login/Login"
import PortalAlumno from "../pages/PortalAlumno/PortalAlumno"
import PortalMaestro from "../pages/PortalMaestro/PortalMaestro"
import PortalSolicitudes from "../pages/Solicitudes/PortalSolicitudes"
import ProtectedRoute from "../routes/ProtectedRoutes"
import SolicitudesAprobadas from "../pages/SolicitudesAprobadas/SolicitudesAprobadas"
import SolicitudesRechazadas from "../pages/SolicitudesRechazadas/SolicitudesRechazadas"
import SolicitudHistorial from "../pages/SolicitudesHistorial/SolicitudesHistorial"
import RegistrarAlumnoPage from "../pages/RegistrarAlumno/RegistrarAlumnoPage"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
         path="/login" 
         element={<Login />

         } 
         />

        {/* PROTEGIDAS */}
        <Route
          path="/alumno/portal"
          element={
            <ProtectedRoute>
              <PortalAlumno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maestro/portal"
          element={
            <ProtectedRoute>
              <PortalMaestro />
            </ProtectedRoute>
          }
        />
          <Route
            path="/maestro/solicitudes"
            element={<PortalSolicitudes />}
        />
          <Route
            path="/maestro/aprobadas"
            element={<SolicitudesAprobadas />}
        />
          <Route
    path="/maestro/rechazadas"
    element={<SolicitudesRechazadas />}
/>

<Route
    path="/maestro/historial"
    element={<SolicitudHistorial />}
/>

<Route
    path="/maestro/registrar"
    element={<RegistrarAlumnoPage />}
/>


        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter