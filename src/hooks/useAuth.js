import api from "../utils/api"

export const loginUser = async (
  numControl,
  nip
) => {

  try {

    const response = await api.post(
      "/usuario/login",
      {
        numControl,
        contrasena: nip
      }
    )

    // DATA
    const data = response.data

    // SI HAY ERROR DEL BACKEND
    if (data.error) {

      return {
        success: false,
        error: data.error
      }

    }

    // LOGIN CORRECTO
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