import api from "../utils/api"

// =========================
// PASO 1 — CREDENCIALES
// =========================

export const paso1Login = async (
  numControl,
  contrasena
) => {

  try {

    const response = await api.post(
      "/usuario/paso1",
      { numControl, contrasena }
    )

    const data = response.data

    if (data.error) {

      return {
        success: false,
        error: data.error
      }

    }

    return {
      success: true,
      data: data
    }

  } catch (error) {

    console.log(error)

    return {
      success: false,
      error: "Error del servidor"
    }

  }

}

// =========================
// PASO 2 — CÓDIGO OTP
// =========================

export const paso2Verificar = async (
  tempToken,
  codigo
) => {

  try {

    const response = await api.post(
      "/usuario/paso2",
      { tempToken, codigo }
    )

    const data = response.data

    if (data.error) {

      return {
        success: false,
        error: data.error
      }

    }

    return {
      success: true,
      data: data
    }

  } catch (error) {

    console.log(error)

    return {
      success: false,
      error: "Error del servidor"
    }

  }

}

// =========================
// REENVIAR CÓDIGO OTP
// =========================

export const reenviarCodigo = async (
  tempToken
) => {

  try {

    const response = await api.post(
      "/usuario/reenviar",
      { tempToken }
    )

    const data = response.data

    if (data.error) {

      return {
        success: false,
        error: data.error
      }

    }

    return {
      success: true,
      data: data
    }

  } catch (error) {

    console.log(error)

    return {
      success: false,
      error: "Error del servidor"
    }

  }

}

// =========================
// PASO 3 — CONFIRMAR
// =========================

export const paso3Confirmar = async (
  tempToken,
  rol
) => {

  try {

    const response = await api.post(
      "/usuario/paso3",
      { tempToken, rol }
    )

    const data = response.data

    if (data.error) {

      return {
        success: false,
        error: data.error
      }

    }

    return {
      success: true,
      data: data
    }

  } catch (error) {

    console.log(error)

    return {
      success: false,
      error: "Error del servidor"
    }

  }

}