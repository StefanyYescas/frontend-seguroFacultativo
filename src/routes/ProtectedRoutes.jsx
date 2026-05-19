import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

function ProtectedRoute({ children }) {

    const usuario = useAuthStore((state) => state.usuario)

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute