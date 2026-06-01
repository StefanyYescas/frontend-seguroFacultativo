import { create } from "zustand"

function getStoredUsuario() {
    try {
        const raw = localStorage.getItem("usuario")
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export const useAuthStore = create((set) => ({

    usuario: getStoredUsuario(),

    token: localStorage.getItem("token") || null,

    // LOGIN

    login: (data) => {

        localStorage.setItem(
            "token",
            data.token
        )

        localStorage.setItem(
            "usuario",
            JSON.stringify(data)
        )

        set({

            usuario: data,

            token: data.token

        })
    },

    // LOGOUT

    logout: () => {

        localStorage.removeItem("token")

        localStorage.removeItem("usuario")

        set({

            usuario: null,

            token: null

        })
    }

}))