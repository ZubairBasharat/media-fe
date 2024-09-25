import { create } from 'zustand'

const useLayoutStore = create((set) => ({
    collapse: true,
    collapseToggle: () => set((state: any) => ({ collapse: !state.collapse })),
}))

export default useLayoutStore