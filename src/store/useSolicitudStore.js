import { create } from "zustand"

export const useSolicitudStore = create((set) => ({

    solicitudes: [],

    setSolicitudes: (data) => {
        set({
            solicitudes: data
        })
    }

}))