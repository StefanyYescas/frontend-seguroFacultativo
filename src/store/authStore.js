import { create } from "zustand"

export const useAuthStore = create((set) => ({
    usuario: null,

    login: (data) => {
        set({ usuario: data })
    },

    logout: () => {
        set({ usuario: null })
    }
}))