import { create } from 'zustand';
const useSlideStore = create((set) => ({
    isSlideOpen: false,
    openSlide: () => set({ isSlideOpen: true }),
    closeSlide: () => set({ isSlideOpen: false }),
    toggleSlide: () => set((state) => ({ isSlideOpen: !state.isSlideOpen })),
}));
export default useSlideStore;