import api from "../utils/api"

// =========================
// OBTENER
// =========================
export const obtenerSolicitudes = async () => {

    try {

        const response = await api.get(
            "/solicitud"
        )

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            error: "Error al obtener solicitudes"
        }

    }

}


// =========================
// ACTUALIZAR
// =========================
export const actualizarSolicitud = async (idSolicitud, datos) => {

    try {

        const response = await api.put(
            `/solicitud/${idSolicitud}`,
            datos
        )

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            error: "Error al actualizar"
        }

    }

}


// =========================
// ENTREGAR SEGURO
// =========================
export const entregarSeguro = async (
    idSolicitud,
    datos
) => {

    try {

        const formData = new FormData()

        formData.append(
            "observacion",
            datos.observacion
        )

        formData.append(
            "archivo",
            datos.archivo
        )

        const response = await api.put(
            `/solicitud/entregar/${idSolicitud}`,
            formData,
            
        )

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            error: "Error al entregar seguro"
        }

    }

}


// =========================
// APROBADAS
// =========================
export const obtenerAprobadas = async () => {

    try {

        const response = await api.get(
            "/solicitud/aprobadas"
        )

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            error: "Error al obtener aprobadas"
        }

    }

}


// =========================
// RECHAZADAS
// =========================
export const obtenerRechazadas = async () => {

    try {

        const response = await api.get(
            "/solicitud/rechazadas"
        )

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            error: "Error al obtener rechazadas"
        }

    }

}


// =========================
// HISTORIAL
// =========================
export const obtenerHistorial = async () => {

    try {

        const response = await api.get(
            "/solicitud/historial"
        )

        return {
            success: true,
            data: response.data
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            error: "Error al obtener historial"
        }

    }

}