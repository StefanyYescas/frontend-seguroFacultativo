import { create } from "zustand"

export const useAuthStore = create((set) => ({

    usuario: null,

    token: localStorage.getItem("token") || null,

    // LOGIN

    login: (data) => {

        localStorage.setItem(
            "token",
            data.token
        )

        set({

            usuario: data,

            token: data.token

        })
    },

    // LOGOUT

    logout: () => {

        localStorage.removeItem("token")

        set({

            usuario: null,

            token: null

        })
    }

}))