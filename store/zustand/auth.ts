import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set, get: any) => ({
            user: {},
            setUser: (data: any) => set({ user: data }),
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useAuthStore;