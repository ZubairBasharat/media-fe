import { create } from 'zustand'

const useFormSettingStore = create((set) => ({
    collapse: false,
    mode: false,
    updateData: {},
    collapseToggle: () => set((state: any) => ({ collapse: !state.collapse, mode: false, updateData: {} })),
    setUpdate: (data: any) => set((state: any) => ({
        mode: true,
        collapse: true,
        updateData: data
    }))
}))

export default useFormSettingStore